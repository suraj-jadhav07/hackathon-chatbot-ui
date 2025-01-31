import React, { useState } from "react";
import "../styles/Otp.css";
import { useNavigate } from "react-router-dom";
import "../styles/Common.css";

const Otp = () => {

    const [loading, setLoading] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleOtpClick = (event) => {
        event.preventDefault();
        console.log('Entered OTP=>', otp);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSignIn(true);
        }, 2000);
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
    return (
        <div className="otp-container">
            <div className="otp-box">
                <h2 className="otp-verfication-heading">{showSignIn ? "OTP verified successfully..!!": "OTP Verification"}</h2>
                <form className="otp-form">
                    <input className="enter-otp-box" type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
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
