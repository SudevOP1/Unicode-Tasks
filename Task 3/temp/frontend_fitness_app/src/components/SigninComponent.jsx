import React from "react";

const SigninComponent = () => {
    return (
        <div className="body flex justify-center items-center">
            <div className="signin-container flex justify-center items-center">
                <div className="text-red-500">Test Text</div>
                <h1>Sign In</h1>
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
