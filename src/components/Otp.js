import React, { useState } from "react";
import "../styles/Otp.css";
import { useNavigate } from "react-router-dom";
import "../styles/Common.css";
import { API_CONST } from "../core/constants";
import axios from "axios";
import botLogo from "../images/bot-logo.png"
const Otp = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("")

    const handleOtpClick = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log('Entered OTP=>', otp);
        const validateForm = validateOtp(otp);
        if(validateForm) {
            let email = localStorage.getItem("email");
            axios
            .post(API_CONST.VERIFY_OTP, {
                otp: Number(otp),
                email
            })
            .then((response) => {
                console.log("OPT Verification successful:", response.data);
                setTimeout(() => {
                    setLoading(false);
                    setShowSignIn(true);
                    navigate("/chatbox");
                    localStorage.removeItem("email");
                    setError("");
                }, 2000);
            })
            .catch((error) => {
                console.error("OTP failed:", error.response?.data || error.message);
                setLoading(false);
            });


        } else {
            setLoading(false);
        }
    }

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    }

    const handleBackToSignIn = (event) => {
        event.preventDefault();
        setOtp("");
        setShowSignIn(false);
        navigate("/");
    }

    const validateOtp = (data) => {
        console.log("otp received for validation=>",data);
        // const errorMessage = "";
        if(!data.trim()) {
            setError("OTP is required");
            return false;
        } else if(data.trim().length < 6) {
            setError("OTP does not match");
            return false;
        }
        return true;
    }

    return (
        <div className="otp-container">
            <div className="otp-box">
            <div className="bot-logo">
                    <img src={botLogo} alt="logo" />
                </div>
                <h2 className={`otp-verfication-heading ${showSignIn && "success"}`}>{showSignIn ? "OTP verified successfully..!!": "OTP Verification"}</h2>
                <form className="otp-form">
                    <input className="enter-otp-box" type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
                    {<span className={`otp-error ${error && "show"}`}>{error}</span>}
                    {
                        showSignIn ?
                            <>
                                <button className="otp-button" onClick={handleBackToSignIn} disabled={loading}>{loading ? <span className="loader"></span> : "Back to SignIn"}</button>
                            </>
                            :
                            <>
                                <button className="otp-button" onClick={handleOtpClick} disabled={loading}>{loading ? <span className="loader"></span> : "Verify and Proceed"}</button>
                            </>
                    }
                </form>
            </div>
        </div>
    );
};

export default Otp;
