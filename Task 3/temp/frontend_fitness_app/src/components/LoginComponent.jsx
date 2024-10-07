import React from "react";

const LoginComponent = () => {
    return (
        <div className="body flex justify-center items-center">
            <div className="login-container flex justify-center items-center">
                <h1>Login</h1>
                <div className="input-field">
                    <p>Email Address</p>
                    <input type="email" />
                </div>
                <div className="input-field">
                    <p>Password</p>
                    <input type="password" />
                </div>
                <div className="input-field">
                    <p>Password Again</p>
                    <input type="password" />
                </div>
                <button>Login</button>
                <a href="">Already have an account?</a>
            </div>
        </div>
    );
};

export default LoginComponent;
