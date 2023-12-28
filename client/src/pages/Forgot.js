import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");

        window.alert("Password reset successful!");
    };

    const inputStyle = {
        margin: "5px 0",
        padding: "8px",
        width: "100%",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        margin: "10px 0",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    return (
        <div className="forgot" style={{margin:'100px 550px 80px 550px',padding:'10px'}}>
           <b><h1 style={{ color: "red",textAlign:'center' }}>Forgot Password</h1></b> 
            <form className="forgot-form" onSubmit={handleSubmit}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <label htmlFor="email">Email id</label>
                <input
                    type="email"
                    placeholder="Email id"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                    className="input input-bordered w-full mb-6"
                />
                <label htmlFor="newpassword">Enter New Password</label>
                <input
                    type="password"
                    placeholder="********"
                    id="newpassword"
                    name="newpassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={inputStyle}
                    required
                    className="input input-bordered w-full mb-6"
                />
                <label htmlFor="cnfpassword">Confirm New Password</label>
                <input
                    type="password"
                    placeholder="********"
                    id="cnfpassword"
                    name="cnfpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                    required
                    className="input input-bordered w-full mb-6"
                />
               <button type="submit" style={buttonStyle}>
                    Submit
                </button> 
                {/* <Link to="/sign-in" className="link link-primary">
          <button>Submit</button>
        </Link> */}
            </form>
        </div>
    );
}