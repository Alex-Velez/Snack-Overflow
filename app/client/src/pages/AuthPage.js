import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import "./Page.css";
import "./AuthPage.css";

export default function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        // todo: send data to backend
        console.log("Logging in with:", username, password);
        navigate('/'); // todo: go to home after sending and verifying login data
    }

    return (
        <>
            <Header />
            <div className="auth-container">
                <img src="/green-shopping-bag.png" height="100vh" alt="" />
                <div className="auth-box">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /><br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                        <button type="submit">Login</button>
                    </form>
                </div>

            </div>
        </>
    );
}
