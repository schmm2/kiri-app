import { SignInButton } from "components/SignInButton";
import React from "react"

import './Login.css'

export default function Login() {
    return (
        <div className="loginPage">
            <div className="loginCard">
                <h1>Login</h1>
                <p className="textCenter">Welcome to kiri.<br/>Use your AzureAD Accout to login.</p>
                <SignInButton />
            </div>
        </div>
    );
}