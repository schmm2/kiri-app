import React from "react"
import { useMsal } from "@azure/msal-react";
import { Button } from "antd";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleMicrosoftLogin = () => {
        instance.loginRedirect(loginRequest);
    }

    return (
        <div className="textCenter">
            <Button size="md" onClick={() => handleMicrosoftLogin()}>
                Sign in with Microsoft
            </Button>
        </div>
    )
};