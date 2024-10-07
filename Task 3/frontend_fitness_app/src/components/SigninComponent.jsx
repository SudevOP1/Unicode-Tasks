import React from "react";
import "../components/SigninComponent.css";

const SigninComponent = () => {
    return (
        <div className="body">
            <div className="signin-container">
                <h1>Signin</h1>
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
                <button>Signin</button>
                <a href="">Already have an account?</a>
            </div>
        </div>
    );
};

export default SigninComponent;
