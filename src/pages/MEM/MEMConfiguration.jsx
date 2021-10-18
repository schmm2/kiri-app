import React, { useReducer, useState } from "react";
import { configurationById } from "graphql/queries";
import { Link } from "react-router-dom";
import { updatedDiff } from 'deep-object-diff';
import { renderDate } from 'util/renderDate';
import { findType } from 'util/findType';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { useQuery } from '@apollo/client';
import { apipost } from 'util/api';
import ReactJson from 'react-json-view'
import DefaultPage from '../../layouts/DefaultPage';

import { Table, Button, Menu, Dropdown, Badge, Space, Tabs, Spin } from 'antd';
import { CodeViewer } from "components/CodeViewer";
import { CopyConfigurationModal } from "components/CopyConfigurationModal";
import { ClipboardButton } from "components/ClipboardButton";
const { TabPane } = Tabs;

export default function MEMConfiguration(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { match: { params } } = props;
    const { data, dataLoading, dataError } = useQuery(configurationById, {
        variables: { id: params.configurationId },
        onCompleted: (data) => {
            console.log(data);
            let configurationItem = data.configurationById;
            let configurationVersions = data.configurationById.configurationVersions;
            let newestConfigurationVersionItem = {};

            let changedConfigurationVersions = [];
            configurationVersions.map(configurationVersion => {
                let newConfigurationVersion = { ...configurationVersion };
                // convert json value back to js object
                newConfigurationVersion.value = JSON.parse(newConfigurationVersion.value);
                console.log(newConfigurationVersion);

                // find newest version
                if (newConfigurationVersion.isNewest) {
                    newestConfigurationVersionItem = newConfigurationVersion;
                }
                changedConfigurationVersions.push(newConfigurationVersion);
            });

            // define msGraphResource
            let msGraphResource = "";
            if (configurationItem.configurationType) {
                let configurationType = configurationItem.configurationType;
                if (configurationType.msGraphResource) {
                    msGraphResource = configurationType.msGraphResource;
                    console.log(msGraphResource);
                }
            }

            // order by versions desc
            changedConfigurationVersions.sort((a, b) => parseFloat(b.version) - parseFloat(a.version));

            // update state
            let newState = {
                "configuration": configurationItem,
                "configurationType": configurationItem.configurationType,
                "selectedConfigurationVersion": changedConfigurationVersions[0],
                "configurationVersions": changedConfigurationVersions,
                "newestConfigurationVersion": newestConfigurationVersionItem,
                "msGraphResource": msGraphResource
            }
            console.log(newState);
            dispatch({ type: "SET_CONFIGURATION", newState });
        }
    });



    const initialState = {
        configuration: {},
        newestConfigurationVersion: {},
        selectedConfigurationVersion: {},
        msGraphResource: "",
        configurationVersions: [],
        versionHistoryDataSource: [],
        loading: true,
        error: false
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'SET_CONFIGURATION':
                return {
                    ...state,
                    configuration: action.newState.configuration,
                    configurationVersions: action.newState.configurationVersions,
                    selectedConfigurationVersion: action.newState.selectedConfigurationVersion,
                    newestConfigurationVersion: action.newState.newestConfigurationVersion,
                    msGraphResource: action.newState.msGraphResource,
                    configurationType: action.newState.configurationType,
                    loading: false,
                }
            case 'SET_SELECTEDCONFIGURATIONVERSION':
                return {
                    ...state,
                    versionHistoryDataSource: action.newState.versionHistoryDataSource,
                    selectedConfigurationVersion: action.newState.selectedConfigurationVersion
                }
            case 'ERROR':
                return { ...state, error: true, loading: false }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function manageSelectedconfigurationVersion(selectedConfigurationVersion) {
        let difference = updatedDiff(state.newestConfigurationVersion.value, selectedConfigurationVersion.value);

        /*console.log("difference");
        console.log(difference);
        console.log("activ config version value")
        console.log(state.newestConfigurationVersion.value);
        console.log("selected configuration version value")
        console.log(selectedConfigurationVersion.value);*/

        // build version history
        let index = 1;
        let dataSourceTmp = [];
        for (let key in difference) {
            // console.log(key);
            let newDataEntry = {
                key: index,
                value: key,
                activeVersion: state.newestConfigurationVersion.value[key],
                previousVersion: selectedConfigurationVersion.value[key]
            }
            // console.log(newDataEntry);
            dataSourceTmp.push(newDataEntry);
            index++;
        }

        // update state
        let newState = {
            "versionHistoryDataSource": dataSourceTmp,
            "selectedConfigurationVersion": selectedConfigurationVersion
        }
        dispatch({ type: "SET_SELECTEDCONFIGURATIONVERSION", newState })
    }

    function renderDataFullObject(record) {
        console.log(record);
        // handle administrative templates
        if (state.msGraphResource && state.msGraphResource.name === "groupPolicyConfigurations") {
            // quick and dirty object clone
            let baseObject = JSON.parse(JSON.stringify(record));
            delete baseObject.gpoSettings;
            return (
                <span>
                    <h3>Configuration</h3>
                    <ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={baseObject} />
                    <h3>Settings</h3>
                    <ReactJson name={false} enableClipboard={true} displayDataTypes={false} src={record.gpoSettings} />
                </span>
            )
        }
        // handle the rest
        return (<ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={record} />)
    }

    function renderData(record) {
        let type = findType(record);
        // console.log("found type " + type + " for data " + record);

        switch (type) {
            case "array":
                return (<ReactJson name={false} enableClipboard={true} displayDataTypes={false} src={record} />)
            case "object":
                return (<ReactJson name={false} enableClipboard={true} displayDataTypes={false} src={record} />)
            case "date":
                return renderDate(record);
                break;
            case "boolean":
                return record.toString()
            case "null":
                return "not set"
            default:
                console.log(record);
                return (<span className="lineBreakAnywhere">{record}</span>)
        }
    }

    const versionHistoryColumns = [
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Active Version',
            dataIndex: 'activeVersion',
            key: 'activeVersion',
            render: (text, record) => renderData(record.activeVersion)
        },
        {
            title: 'Previous Version',
            dataIndex: 'previousVersion',
            key: 'previousVersion',
            render: (text, record) => renderData(record.previousVersion)
        },
    ];


    const configurationVersionsMenu = (
        <Menu>
            {state.configurationVersions.map((item, index) => {
                // remove newest version
                if (!item.isNewest) {
                    return (
                        <Menu.Item key={item.id} onClick={() => manageSelectedconfigurationVersion(item)}>
                            <span>{
                                item.graphModifiedAt &&
                                renderDate(item.graphModifiedAt)
                            }</span>
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    );

    const versionTab = (
        <Space>Version History
            <Badge count={state.configurationVersions.length - 1} />
        </Space>
    );

    async function restoreVersion() {
        let tenantDbId = state.configuration.tenant._id;
        let configurationVersionDbId = state.selectedConfigurationVersion._id;
        let msGraphResource = state.msGraphResource;

        apipost("orchestrators/ORC1100MEMConfigurationUpdate", {
            tenantDbId: tenantDbId,
            configurationVersionDbId: configurationVersionDbId,
            msGraphResource: msGraphResource
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Restore Configuration', 'Job started', 'info');
            }).catch((error) => {
                openNotificationWithIcon('Restore Configuration', 'Job error', 'error');
                console.log(error);
            });
    }

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    function copyConfiguration(data) {
        apipost("orchestrators/ORC1101MEMConfigurationCreate", {
            tenantDbId: data.targetTenant._id,
            configurationName: data.newConfigName,
            configurationVersionDbId: state.newestConfigurationVersion._id,
            msGraphResource: state.msGraphResource,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Copy Configuration', 'Job started', 'info');
            }).catch((error) => {
                openNotificationWithIcon('Copy Configuration', 'Job error', 'error');
                console.log(error);
            });
    }

    return (
        <DefaultPage>
            <div className="controlTop">
                <Space align="end">
                    <Button onClick={openModal}>Copy</Button>
                </Space>
            </div>
            <CopyConfigurationModal
                showModal={isModalVisible}
                onClose={closeModal}
                configurationDisplayName={state.newestConfigurationVersion.displayName}
                onCopy={copyConfiguration}>
            </CopyConfigurationModal>
            <div className="contentArea">
                {state.loading ? (
                    <div>
                        <Spin />
                    </div>
                ) : (
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Overview" key="1">
                            <div className="basicInformationTable">
                                <div className="row">
                                    <div className="labelInfo">Name</div>
                                    <span>{state.newestConfigurationVersion.displayName}</span>
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Description</div>
                                    {
                                        state.newestConfigurationVersion.value &&
                                        <span>{state.newestConfigurationVersion.value.description}</span>
                                    }
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Last Modified</div>
                                    {
                                        renderDate(state.newestConfigurationVersion.graphModifiedAt)
                                    }
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Platform</div>
                                    <div>{state.configurationType.platform}</div>
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Type</div>
                                    <span>{state.configurationType.name}</span>
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Id in MEM</div>
                                    <span>{state.configuration.graphId}</span>
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Version</div>
                                    {
                                        state.newestConfigurationVersion.value &&
                                        <span>{state.newestConfigurationVersion.value.version}</span>
                                    }
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Settings" key="2">
                            <ClipboardButton data={state.newestConfigurationVersion.value}></ClipboardButton>
                            {
                                state.newestConfigurationVersion &&
                                renderDataFullObject(state.newestConfigurationVersion.value)
                            }
                        </TabPane>
                        <TabPane tab={versionTab} key="3" disabled={state.configurationVersions.length <= 1}>
                            <Dropdown overlay={configurationVersionsMenu} placement="bottomRight" arrow>
                                <Button>
                                    {
                                        state.selectedConfigurationVersion &&
                                        renderDate(state.selectedConfigurationVersion.graphModifiedAt)
                                    }
                                </Button>
                            </Dropdown>
                            <div hidden={!state.selectedConfigurationVersion}>
                                <Table dataSource={state.versionHistoryDataSource} columns={versionHistoryColumns} />
                                <div className="controlBottom">
                                    <Space align="end">
                                        <Button onClick={restoreVersion}>
                                            Restore Version
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        </TabPane>
                        {
                            state.configurationType && state.configurationType.name === "deviceManagementScript" &&
                            <TabPane tab="Script" key="4">
                                {
                                    state.newestConfigurationVersion &&
                                    state.newestConfigurationVersion.value &&
                                    state.newestConfigurationVersion.value.scriptContent &&
                                    <CodeViewer code={state.newestConfigurationVersion.value.scriptContent} convertFromBase64={true} language="powershell"></CodeViewer>
                                }
                            </TabPane>
                        }
                        {
                            state.configurationType && state.configurationType.name === "deviceHealthScript" &&
                            <TabPane tab="Script" key="5">
                                <h2>Detection Script</h2>
                                {
                                    state.newestConfigurationVersion &&
                                    state.newestConfigurationVersion.value &&
                                    state.newestConfigurationVersion.value.detectionScriptContent &&
                                    <CodeViewer code={state.newestConfigurationVersion.value.detectionScriptContent} convertFromBase64={true} language="powershell"></CodeViewer>
                                }
                                <h2>Remediation Script</h2>
                                {
                                    state.newestConfigurationVersion &&
                                    state.newestConfigurationVersion.value &&
                                    state.newestConfigurationVersion.value.remediationScriptContent &&
                                    <CodeViewer code={state.newestConfigurationVersion.value.remediationScriptContent} convertFromBase64={true} language="powershell"></CodeViewer>
                                }
                            </TabPane>
                        }
                    </Tabs>
                )}
            </div>
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link onClick={props.history.goBack}>Back</Link>
                    </Button>
                </Space>
            </div>
        </DefaultPage>
    );
}