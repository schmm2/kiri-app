import React, { useContext, useReducer, useState } from "react";
import { getNewestConfigurationVersions } from "graphql/queries";
import { Table, Switch, Space, Button } from 'antd';
import { Link } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { AddToDeploymentModal } from "components/AddToDeploymentModal";
import DefaultPage from "layouts/DefaultPage";
import { deploymentUpdateOne as deploymentUpdateOneMutation } from "graphql/mutations"

export default function MEMConfigurations(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectedTenant = useContext(TenantContext);
    //console.log(selectedTenant);

    const initialState = {
        configurations: [],
        filteredConfigurations: [],
        selectedRows: [],
        selectedRowKeys: [],
        category: null,
        loading: true,
        error: false,
        showDeleted: false
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'SET_CONFIGURATIONS':
                return { ...state, configurations: action.configurations, filteredConfigurations: action.filteredConfigurations, loading: action.loading }
            case 'ERROR':
                return { ...state, loading: false, error: true }
            case 'SET_SHOWDELETED':
                return { ...state, showDeleted: action.showDeleted }
            case 'SET_SELECTEDROWS':
                return { ...state, selectedRows: action.selectedRows }
            case 'SET_SELECTEDROWKEYS':
                return { ...state, selectedRowKeys: action.selectedRowKeys }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function filterConfigurations(configurations) {
        //console.log(configurations);
        let configurationCollection = [];

        for (let i = 0; i < configurations.length; i++) {
            let configuration = configurations[i];
            let configurationType = configuration.configurationType;
            // console.log(props.category);
            // console.log(configurationType.category);

            // check for matching category
            if (props.category && (props.category === configurationType.category)) {

                // check if config belongs to selected Tenant matches
                if (selectedTenant && configuration.tenant) {
                    if (selectedTenant._id !== configuration.tenant._id) {
                        // skip this config
                        continue;
                    }
                }

                if (configuration.newestConfigurationVersions && configuration.newestConfigurationVersions[0]) {
                    let newConfigurationObject = {};
                    let configurationVersion = configuration.newestConfigurationVersions[0];

                    // skip deleted Configs if option is not selected
                    if (state.showDeleted === false && (configurationVersion.state).toString() === "deleted") {
                        continue;
                    }

                    // build new config object
                    // adds pressure to client, makes iterating much easier
                    newConfigurationObject.id = configuration._id;
                    newConfigurationObject.displayName = configurationVersion.displayName;
                    newConfigurationObject.modifiedAt = configurationVersion.graphModifiedAt;
                    newConfigurationObject.platform = configurationType.platform;
                    newConfigurationObject.type = configurationType.name;
                    newConfigurationObject.state = configurationVersion.state;

                    configurationCollection.push(newConfigurationObject);
                }
            }
        };
        console.log("Configuration Item Count:" + configurationCollection.length);
        return configurationCollection;
    }

    const [updateDeployment] = useMutation(deploymentUpdateOneMutation, {
        onCompleted(data) {
            console.log(data);
        }
    });

    useQuery(getNewestConfigurationVersions, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            let configurations = data.configurationMany;
            let filteredConfigurations = filterConfigurations(configurations);
            dispatch({ type: "SET_CONFIGURATIONS", configurations: configurations, filteredConfigurations: filteredConfigurations, loading: false });
        },
        onError: (error) => {
            dispatch({ type: "ERROR" });
        }
    })

    function refilter() {
        if (state.configurations && state.configurations.length > 0) {
            let filteredConfigurations = filterConfigurations(state.configurations);
            dispatch({ type: "SET_CONFIGURATIONS", configurations: state.configurations, filteredConfigurations: filteredConfigurations, loading: false });
        }
    }

    React.useEffect(() => {
        refilter();
    }, [props.category, selectedTenant, state.showDeleted]);

    const columns = [
        {
            title: "Name",
            dataIndex: "displayName",
            render: (text, record) => <Link to={props.category + '/' + record.id} > {record.displayName} </Link>,
            visible: true
        },
        {
            title: "Type",
            dataIndex: ["type"],
            visible: true
        },
        {
            title: "Platform",
            dataIndex: ["platform"],
            visible: true
        },
        {
            title: "Modified at",
            dataIndex: ["modifiedAt"],
            render: (text, record) => renderDate(text),
            sorter: (a, b) => moment(a.modifiedAt).unix() - moment(b.modifiedAt).unix(),
            defaultSortOrder: 'descend',
            visible: true
        }
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    function switchShowDeleted(checked) {
        console.log(checked);
        dispatch({ type: "SET_SHOWDELETED", showDeleted: checked });
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            dispatch({ type: "SET_SELECTEDROWS", selectedRows: selectedRows });
            dispatch({ type: "SET_SELECTEDROWKEYS", selectedRowKeys: selectedRowKeys });
        }
    };

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    function addToDeployment(data) {
        // get existing configurationVersions on deployment: data.configurationVersions; get configurationVersions to add to deployment: state.selectedRowKeys;
        // find out which configVersion Ids needs to be added
        let configurationVersionsToAddToDeployment = state.selectedRowKeys.filter(id => data.configurationVersions.indexOf(id) === -1);

        // add new configs to existing configurationVersions 
        let finalConfigurationVersions = data.configurationVersions.concat(configurationVersionsToAddToDeployment);

        // update deployment if new configVersions have been found
        if (configurationVersionsToAddToDeployment.length > 0) {
            let parameter = {
                variables: {
                    record: { configurationVersions: finalConfigurationVersions },
                    filter: { _id: data._id }
                }
            }
            updateDeployment(parameter);
        }
    }

    return (
        <DefaultPage>
            <h1 > {props.title} </h1>
            <div className="controlTop">
                <Space align="end">
                    <Button disabled={state.selectedRows.length === 0} onClick={openModal}>+ Deployment</Button>
                </Space>
            </div>
            <AddToDeploymentModal
                showModal={isModalVisible}
                onClose={closeModal}
                onAdd={addToDeployment}
            />
            <Table
                rowKey="id"
                loading={state.loading}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={columns}
                dataSource={state.filteredConfigurations}
                onChange={onChange}
                pagination={
                    { pageSize: 25 }
                }
            />
            <span>Show Deleted <Switch onChange={switchShowDeleted} /></span >
        </DefaultPage>
    );
}