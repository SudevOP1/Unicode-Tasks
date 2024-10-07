import React from "react";
import "../components/LoginComponent.css";

const LoginComponent = () => {
    return (
        <div className="body">
            <div className="login-container">
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
