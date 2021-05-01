import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getConfiguration } from "graphql/queries";
import { triggerConfigurationUpdate } from "graphql/mutations";
import { Link } from "react-router-dom";
import { updatedDiff } from 'deep-object-diff';
import { renderDate } from 'util/renderDate';
import ReactJson from 'react-json-view'
import { findType } from 'util/findType';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

import { Table, Button, Menu, Dropdown, Badge, Space, Tabs, Spin } from 'antd';
import { render } from "@testing-library/react";
const { TabPane } = Tabs;

export default function MEMConfiguration(props) {

    const { match: { params } } = props;

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
            console.log(newDataEntry);
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
                    <ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={record.gpoSettings} />
                </span>
            )
        }
        // handle the rest
        return (<ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={record} />)
    }

    function renderData(record) {

        let type = findType(record);
        console.log("found type " + type + " for data " + record);

        switch (type) {
            case "array":
                return (<ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={record} />)
            case "object":
                return (<ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={record} />)
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

    async function fetchConfiguration() {
        try {
            if (params.configurationId) {
                // console.log(params.configurationId)

                let configurationItem = await API.graphql({ query: getConfiguration, variables: { id: params.configurationId } });
                configurationItem = configurationItem.data.getConfiguration;

                let configurationVersionItems = configurationItem.configurationVersions.items;
                let newestConfigurationVersionItem = {};

                configurationVersionItems.map(configurationVersion => {
                    // convert value back to js object
                    configurationVersion.value = JSON.parse(JSON.parse(configurationVersion.value));

                    // find newest version
                    if (configurationVersion.isNewest) {
                        newestConfigurationVersionItem = configurationVersion;
                    }
                    return configurationVersion;
                });

                // define msGraphResource
                let msGraphResource = "";
                if (configurationItem.configurationType) {
                    let configurationType = configurationItem.configurationType;
                    if (configurationType.msGraphResource) {
                        msGraphResource = configurationType.msGraphResource;
                        // console.log(msGraphResource);
                    }
                }

                // order by versions desc
                configurationVersionItems.sort((a, b) => parseFloat(b.version) - parseFloat(a.version));

                // update state
                let newState = {
                    "configuration": configurationItem,
                    "configurationType": configurationItem.configurationType,
                    "selectedConfigurationVersion": configurationVersionItems[0],
                    "configurationVersions": configurationVersionItems,
                    "newestConfigurationVersion": newestConfigurationVersionItem,
                    "msGraphResource": msGraphResource
                }
                // console.log(configurationItem);
                // console.log(newState);

                // set initial selected conf version
                if (configurationVersionItems[0]) {
                    // race condition state update
                    //manageSelectedconfigurationVersion(configurationVersionItems[0]);
                }

                dispatch({ type: "SET_CONFIGURATION", newState });
            } else {
                throw "no id defined";
            }
        } catch (err) {
            console.error("error fetching configuration versions");
            console.log(err);
            dispatch({ type: "ERROR" })
        }
    }

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

    useEffect(() => {
        fetchConfiguration();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function restoreVersion() {
        /*console.log("restore version");
        console.log(state.configuration.tenant.id);
        console.log(state.newestConfigurationVersion.id);
        console.log(state.msGraphResource);*/

        try {
            openNotificationWithIcon('Restore configuration', 'Starting restore', 'info');

            let response = await API.graphql(graphqlOperation(triggerConfigurationUpdate, {
                tenantId: state.configuration.tenant.id,
                newConfigurationVersionId: state.selectedConfigurationVersion.id,
                msGraphResource: JSON.stringify(state.msGraphResource)
            }));
            console.log(response);

            if (response.data && response.data.triggerConfigurationUpdate) {
                let triggerConfigurationUpdateResponse = JSON.parse(response.data.triggerConfigurationUpdate).body;
                if (triggerConfigurationUpdateResponse.ok && triggerConfigurationUpdateResponse.ok === true) {
                    openNotificationWithIcon('Restore configuration', 'All done', 'success');
                } else {
                    openNotificationWithIcon('Restore configuration', 'Unable to restore configuration', 'error');
                }
            }      
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div>
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
                                    <span>{state.configurationType.label}</span>
                                </div>
                                <div className="row">
                                    <div className="labelInfo">Id</div>
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
        </div>
    );
}