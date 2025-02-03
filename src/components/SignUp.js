import React, { useState } from "react";
import "../styles/Form.css";
import "../styles/Common.css";
import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSignUp = () => {
        setLoading(true);
        console.log("Form Data=>", formData);
        const validationErrors = validateSignUpForm(formData);
        console.log('validation signup form errors=>', validationErrors);

        if (validationErrors && Object.keys(validationErrors).length) {
            setLoading(false);
            setErrors(validationErrors);
        } else {
            setTimeout(() => {
                setLoading(false);
                navigate("/otp");
            }, 2000);

            // axios
            // .post("")
            // .then((response) => {
            //     console.log("reponse=>",response);
            //     setLoading(false);
            // })
            // .catch((error) => {
            //     console.log("error =>", error);
            // });

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateSignUpForm = (formData) => {
        console.log("Form Data=>", formData);
        const errors = {};
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        } else if (formData.name.length < 3) {
            errors.name = "Name should be atleast 3 characters long";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        }

        return errors;
    }

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-header">Sign up</h2>
                <form className="form">
                    <label className="input-label">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" defaultValue="Jon Snow" />
                    {errors && errors.name && <span className="error-form">{errors.name}</span>}
                    <label className="input-label">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" defaultValue="your@email.com" />
                    {errors && errors.email && <span className="error-form">{errors.email}</span>}
                    <label className="input-label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" defaultValue="••••••" />
                    {errors && errors.password && <span className="error-form">{errors.password}</span>}
                    {/* <label className="checkbox-container">
                        <input type="checkbox" /> I want to receive updates via email.
                    </label> */}
                </form>
                <button className="submit-button" onClick={handleSignUp} disabled={loading}>{loading ? <span className="loader"></span> : "Sign Up"}</button>
                <div className="divider">or</div>
                <p className="signin-text">Already have an account? <Link className="to-signup-signin" to="/">Sign in</Link></p>
            </div>
        </div>
    );
};

export default Signup;
