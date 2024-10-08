import React from "react";
// import "../components/LoginComponent.css";

const LoginComponent = () => {
    return (
        <div className="body flex justify-center items-center h-screen">
            <div className="login-container bg-white shadow-xl rounded-2xl p-10">
                <h1>Login</h1>
                <div className="input-field">
                    <p>Email Address</p>
                    <input type="email" />
                </div>
                <div className="input-field">
                    <p>Password</p>
                    <input type="password" />
                </div>
                <button>Login</button>
                <a href="">Create an Account</a>
            </div>
        </div>
    );
};

export default LoginComponent;
