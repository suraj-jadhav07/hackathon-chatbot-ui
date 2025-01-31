import React from "react";
import "../styles/Login.css";
import fbLogo from "../images/facebook.svg";
import googleLogo from "../images/google.svg";


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="form-header">Sign in</h2>
                <form className="login-form">
                    <label className="input-label">Email</label>
                    <input type="email" placeholder="Email" defaultValue="your@email.com" />
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="Password" defaultValue="••••••" />
                    <label className="login-checkbox-container">
                        <input type="checkbox" /> Remember me
                    </label>
                </form>
                <button className="login-button">Sign In</button>
                <a href="#" className="link-forgot-password">Forgot your password?</a>
                <div className="divider">or</div>
                <button className="google-button">
                    <img src={googleLogo} alt="Google logo" className="logo" />
                    Sign In with Google
                </button>
                <button className="facebook-button">
                    <img src={fbLogo} alt="Facebook logo" className="logo" />
                    Sign In with Facebook
                </button>
                <p className="signin-text">Don't have an account? <a href="#">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Login;
