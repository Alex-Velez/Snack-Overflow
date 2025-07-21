import React, { use } from 'react';
import Page from '../components/Page/Page';
import AuthButtons from '../components/AuthButtons/AuthButtons';
import AuthModal from '../components/AuthModal/AuthModal';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function AuthPage({setActiveUser, activeUser}) {
    const [modal, setModal] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    if(activeUser){
        navigate("/profile")
    }


    
    async function handleLogin(data){
        let res = await fetch("/api/users/login",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)}
        )
        let result = await res.json();
        if(result.error){
            setError(true)
        }
        else{
            setActiveUser(result.id)
            navigate("/")
        }
    }

    async function handleSignup(data){
        if(data.password !== data.confirmPassword){
            setError("NOMATCH");
            return;
        }
        let res = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let result = await res.json();
        if(result.error){
            setError(result.error);
        }
        else{
            setModal("login")
            navigate("/login")
        }
    }
    
    return (
        <Page activeUser={activeUser}>
            <AuthModal type={modal} error={error} handleLogin={handleLogin} handleSignUp={handleSignup}/>
            <AuthButtons setModal={setModal}/>
        </Page>
    );
}
