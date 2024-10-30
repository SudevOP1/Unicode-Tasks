import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Header.css";

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext);
    return (
        <div className="header-container">
            <h3 className="app-title">FitGenius</h3>
            <div className="nav-links">
                <Link className="nav-link" to="/">Home</Link>

                {user ? (
                    <p className="nav-link" onClick={logoutUser} style={{ marginRight: "30px" }}>
                        Logout
                    </p>
                ) : (
                    <Link className="nav-link" to="/login" style={{ marginRight: "30px" }}>
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
