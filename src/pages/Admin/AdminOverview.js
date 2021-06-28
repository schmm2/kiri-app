import React from "react"
import DefaultPage from '../../layouts/DefaultPage';
import { List, Avatar, Button, Skeleton } from 'antd';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

export default function AdminOverview() {

    const backendApiUrlBase = process.env.REACT_APP_BACKENDAPIURL;
    const functionKey = process.env.REACT_APP_FUNCTIONKEY;

    function stageDatabase() {
        console.log("stage database initialized");

        if (backendApiUrlBase) {
            let functionToCall = "/TRG3000StageDatabase"
            let backendApiUrl = backendApiUrlBase + functionToCall;

            if (functionKey) {
                backendApiUrl = backendApiUrl + "?code=" + functionKey
            }

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(backendApiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let messageText = ""

                    openNotificationWithIcon('Stage Database', 'success', 'success');
                }).catch((error) => {
                    openNotificationWithIcon('Stage Database', 'error', 'error');
                });
        }
        else {
            console.log("api endpoint not defined")
        }
    }

    return (
        <DefaultPage>
            <h1>Admin - Overview</h1>
            <h2>Data Management</h2>
            <List
                itemLayout="horizontal"
            >
                <List.Item
                    actions={[<a href="#" onClick={() => stageDatabase()}>Stage Database</a>]}
                >
                    <List.Item.Meta title="Default Data" description="This function will stage default data into your database. 
                        MsGraphResource and ConfigurtionType Objects will be created. 
                        Feel free to add more via menu."/>
                </List.Item>
            </List>
        </DefaultPage>
    );
}