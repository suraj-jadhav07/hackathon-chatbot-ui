import React, { useState } from "react";
import "../styles/SignUp.css";
import "../styles/Common.css";
import { useNavigate } from "react-router-dom";

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
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign up</h2>
                <form className="signup-form">
                    <input type="text" placeholder="Full name" defaultValue="Jon Snow" />
                    <input type="email" placeholder="Email" defaultValue="your@email.com" />
                    <input type="password" placeholder="Password" defaultValue="••••••" />
                    <label className="checkbox-container">
                        <input type="checkbox" /> I want to receive updates via email.
                    </label>
                </form>
                <button className="signup-button" onClick={handleSignUp} disabled={loading}>{loading ? <span className="loader"></span> : "Sign Up"}</button>
                <div className="divider">or</div>
                <button className="google-button">Sign up with Google</button>
                <button className="facebook-button">Sign up with Facebook</button>
                <p className="signin-text">Already have an account? <a href="/otp">Sign in</a></p>
            </div>
        </div>
    );
};

export default Signup;
