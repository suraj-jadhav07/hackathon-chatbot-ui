import React from "react";
import "../styles/SignUp.css";

const Signup = () => {
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
        <button className="signup-button">Sign up</button>
        <div className="divider">or</div>
        <button className="google-button">Sign up with Google</button>
        <button className="facebook-button">Sign up with Facebook</button>
        <p className="signin-text">Already have an account? <a href="#">Sign in</a></p>
      </div>
    </div>
  );
};

export default Signup;
