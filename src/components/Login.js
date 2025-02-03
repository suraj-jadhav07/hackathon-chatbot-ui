import React, { useState } from "react";
import "../styles/Form.css";
// import fbLogo from "../images/facebook.svg";
// import googleLogo from "../images/google.svg";
import { Link } from "react-router-dom";
import axios from "axios";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation();
    };

    const handleValidation = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "Email cannot be empty";
            valid = false;
        } else if(!validateEmail(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password cannot be empty";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            console.log("Form submitted", { email, password });
            // handleSubmitAPI(email, password);
        }
    }

    const handleSubmitAPI = async  (email, password) => {
        try {
            const response = await axios.post("https://api.example.com/login", {
              email,
              password,
            });
      
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
          } catch (err) {
            setErrors("Invalid credentials");
          }
    }

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-header">Sign in</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="input-label">Email</label>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    {/* <label className="checkbox-container">
                        <input type="checkbox" /> Remember me
                    </label> */}
                    <button className="submit-button" type="submit">Sign In</button>
                </form>
                <a href="#" className="link-forgot-password">Forgot your password?</a>
                {/* <div className="divider">or</div>
                <button className="google-button">
                    <img src={googleLogo} alt="Google logo" className="logo" />
                    Sign In with Google
                </button>
                <button className="facebook-button">
                    <img src={fbLogo} alt="Facebook logo" className="logo" />
                    Sign In with Facebook
                </button> */}
                {/* <p className="signin-text">Don't have an account? <a href="/signup">Sign Up</a></p> */}
            </div>
        </div>
    );
};

export default Login;
