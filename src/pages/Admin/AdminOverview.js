import React from "react"
import DefaultPage from '../../layouts/DefaultPage';
import { List } from 'antd';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { apipost } from "util/api";

export default function AdminOverview() {

    function stageDatabase() {
        console.log("stage database initialized");

        openNotificationWithIcon('Stage Database', 'start', 'success');
        apipost("TRG3000StageDatabase", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Stage Database', 'success', 'success');
            }).catch((error) => {
                openNotificationWithIcon('Stage Database', 'error', 'error');
                console.log(error);
            });
    }

    function clearDatabase() {
        console.log("clear database initialized");

        openNotificationWithIcon('Clear Database', 'start', 'success');
        apipost("TRG3001ClearDatabase", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Clear Database', 'success', 'success');
            }).catch((error) => {
                openNotificationWithIcon('Clear Database', 'error', 'error');
                console.log(error);
            });
    }

    return (
        <DefaultPage>
            <h1>Admin - Overview</h1>
            <h2>Data Management</h2>
            <List
                itemLayout="horizontal"
            >
                <List.Item actions={[<a href="#" onClick={() => stageDatabase()}>Stage Database</a>]}>
                    <List.Item.Meta title="Default Data" description="This function will stage default data into your database. 
                        MsGraphResource and ConfigurtionType Objects will be created. 
                        Feel free to add more via menu."/>
                </List.Item>
                <List.Item actions={[<a href="#" onClick={() => clearDatabase()}>Clear Database</a>]}>
                    <List.Item.Meta title="Clear Data" description="This function will delete all data currently stored in the database." />
                </List.Item>
            </List>
        </DefaultPage>
    );
}