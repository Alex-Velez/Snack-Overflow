import React, { useState } from 'react';
import Header from '../components/Header/Header';
import "./AuthPage.css";

export default function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // todo: send data to backend
        console.log("Logging in with:", username, password);
    }

    return (
        <>
            <Header />
            <div className="auth-wrapper">
                <div className="auth-image"></div>
                <div className="auth-container">
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
            </div>
        </>
    );
}
