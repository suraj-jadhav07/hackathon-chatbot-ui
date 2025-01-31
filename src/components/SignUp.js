import React, { useState } from "react";
import "../styles/Form.css";
import "../styles/Common.css";
import { useNavigate } from "react-router-dom";
import fbLogo from "../images/facebook.svg";
import googleLogo from "../images/google.svg";

const Signup = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/otp");
        }, 2000);
    }

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-header">Sign up</h2>
                <form className="form">
                <label className="input-label">Name</label>
                    <input type="text" placeholder="Full name" defaultValue="Jon Snow" />
                <label className="input-label">Email</label>
                    <input type="email" placeholder="Email" defaultValue="your@email.com" />
                <label className="input-label">Password</label>
                    <input type="password" placeholder="Password" defaultValue="••••••" />
                    <label className="checkbox-container">
                        <input type="checkbox" /> I want to receive updates via email.
                    </label>
                </form>
                <button className="submit-button" onClick={handleSignUp} disabled={loading}>{loading ? <span className="loader"></span> : "Sign Up"}</button>
                <div className="divider">or</div>
                <button className="google-button">
                    <img src={googleLogo} alt="Google logo" className="logo" />
                    Sign In with Google
                </button>
                <button className="facebook-button">
                    <img src={fbLogo} alt="Facebook logo" className="logo" />
                    Sign In with Facebook
                </button>
                <p className="signin-text">Already have an account? <a href="/otp">Sign in</a></p>
            </div>
        </div>
    );
};

export default Signup;
