import React from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();

        let response;
        try {
            response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });
        } catch (error) {
            alert("API could not be fetched!");
            console.error("Error: ", error);
            return;
        }

        if (response.status !== 200) {
            alert("Something went wrong!");
        } else {
            let data = await response.json();
            let decodedToken = jwtDecode(data.access);

            setAuthTokens(data);
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");

            if(loading) {
                setLoading(false);
            }

            // console.log("data: ", data);
            // console.log("data.value: ", data.value);
            // console.log("response: ", response);
            // console.log("Decoded token: ", decodedToken);
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    const updateToken = useCallback(async () => {
        // console.log("update token called");

        if (!authTokens || !authTokens.refresh) {
            console.error("No valid refresh token available");
            setLoading(false);
            logoutUser();
            return;
        }

        let response;
        try {
            response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    refresh: authTokens?.refresh,
                }),
            });
        } catch (error) {
            alert("API could not be fetched!");
            console.error("Error: ", error);
            setLoading(false);
            return;
        }

        // if(response.status === 200) {
        if (response.ok) {
            let data = await response.json();
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            logoutUser();
        }
        setLoading(false);

    }, [authTokens, loading, logoutUser]);

    let contextData = {
        user      : user,
        authTokens: authTokens,
        loginUser : loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        if (loading && authTokens) {
            updateToken();
        } else {
            setLoading(false);
        }

        let fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [authTokens, loading, updateToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};
