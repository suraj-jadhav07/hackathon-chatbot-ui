import React, { useState } from "react";
import "../styles/Otp.css";
import { useNavigate } from "react-router-dom";
import "../styles/Common.css";

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
            setTimeout(() => {
                setLoading(false);
                setShowSignIn(true);
                setError("");
            }, 2000);
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
            setError("otp is required");
            return false;        
        }
        return true;
    }

    return (
        <div className="otp-container">
            <div className="otp-box">
                <h2 className="otp-verfication-heading">{showSignIn ? "OTP verified successfully..!!": "OTP Verification"}</h2>
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
