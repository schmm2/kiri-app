import React from "react"
import { useMsal } from "@azure/msal-react";
import { Button } from "antd";
import { msGraphScopes } from "../authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleMicrosoftLogin = () => {
        instance.loginRedirect(msGraphScopes);
    }

    return (
        <div className="textCenter">
            <Button size="md" onClick={() => handleMicrosoftLogin()}>
                Sign in with Microsoft
            </Button>
        </div>
    )
};