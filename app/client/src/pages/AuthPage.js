import React, { use } from 'react';
import Page from '../components/Page/Page';
import AuthButtons from '../components/AuthButtons/AuthButtons';
import AuthModal from '../components/AuthModal/AuthModal';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function AuthPage({ setActiveUser, activeUser }) {
    const [modal, setModal] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (activeUser) {
        navigate("/profile")
    }

    async function handleLogin(data) {
        try {
            let res = await fetch("/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )

            let result = await res.json();

            if (result.error) {
                setError(result.error)
            }
            else {
                setActiveUser(result.id)
                localStorage.setItem("activeUser", result.id);
                navigate("/")
            }
        }
        catch (err) {
            setError("UNKNOWN_ERR");
            navigate("/login");
        }
    }

    async function handleSignup(data) {
        if (data.password !== data.confirmPassword) {
            setError("NOMATCH");
            return;
        }
        try {
            let res = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let result = await res.json();

            if (result.error) {
                setError(result.error);
            }
            else {
                setModal("login");
                setError(null)
                navigate("/login")
            }
        }
        catch (err) {
            setError("UNKNOWN_ERR");
            navigate("/login");
        }
    }

    return (
        <Page activeUser={activeUser}>
            <AuthModal type={modal} error={error} handleLogin={handleLogin} handleSignUp={handleSignup} changeModal={setModal} />
            <AuthButtons setModal={setModal} />
        </Page>
    );
}
