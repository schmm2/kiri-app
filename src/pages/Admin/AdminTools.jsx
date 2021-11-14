import React from "react"
import DefaultPage from '../../layouts/DefaultPage';
import { List } from 'antd';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { apipost } from "util/api";

export default function AdminTools() {

    function stageDatabase() {
        console.log("stage database initialized");

        openNotificationWithIcon('Stage Database', 'start', 'success');
        apipost("TRG3000StageDatabase", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Stage Database',
                    'Success. New added data: MsGraphResources: ' + data.msGraphResources + ', ConfigurationTypes: ' + data.configurationTypes,
                    'success');
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

    function stopTasks() {
        console.log("stop tasks initialized");

        openNotificationWithIcon('Stop Tasks', 'start', 'success');
        apipost("TRG1002OrchestratorTerminateRunningInstance", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Stop Tasks', 'success', 'success');
            }).catch((error) => {
                openNotificationWithIcon('Stop Tasks', 'error', 'error');
                console.log(error);
            });
    }

    return (
        <DefaultPage>
            <h1>Admin Tools</h1>
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
                <List.Item actions={[<a href="#" onClick={() => stopTasks()}>Stop Tasks</a>]}>
                    <List.Item.Meta title="Stop Tasks" description="This function will stop all tasks in the backend." />
                </List.Item>
            </List>
        </DefaultPage>
    );
}