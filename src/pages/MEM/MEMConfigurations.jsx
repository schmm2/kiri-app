import React, { useContext, useState } from "react";
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
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

export default function MEMConfigurations(props) {

    // states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredConfigurations, setFilteredConfigurations] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedConfigurationVersions, setSelectedConfigurationVersions] = useState([]);

    const selectedTenant = useContext(TenantContext);

    function filterConfigurations(configurations) {
        //console.log(configurations);
        let configurationCollection = [];

        for (let i = 0; i < configurations.length; i++) {
            let configuration = configurations[i];
            let configurationType = configuration.configurationType;
            // console.log(props.category);
            // console.log(configurationType.category);

            // check if config belongs to selected Tenant matches
            if (selectedTenant && configuration.tenant) {
                if (selectedTenant._id !== configuration.tenant._id) {
                    // skip this config
                    continue;
                }
            }

            // check for matching category
            if (props.category && (props.category === configurationType.category)) {

                if (configuration.newestConfigurationVersions && configuration.newestConfigurationVersions[0]) {
                    let newConfigurationObject = {};
                    let configurationVersion = configuration.newestConfigurationVersions[0];

                    // skip deleted Configs if option is not selected
                    if (showDeleted === false && (configurationVersion.state).toString() === "deleted") {
                        continue;
                    }

                    // build new config object
                    // adds pressure to client, makes iterating much easier
                    newConfigurationObject.id = configuration._id;
                    newConfigurationObject.configurationVersionId = configurationVersion._id;
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
            openNotificationWithIcon('Add to Deployment', 'success', 'success');
        }, onError(error) {
            openNotificationWithIcon('Add to Deployment', 'error', 'error');
            console.log(error)
        }
    });

    const { loading, error, data } = useQuery(getNewestConfigurationVersions, {
        onCompleted: () => { console.log("done loading") },
        fetchPolicy: 'cache-and-network'
    })

    function refilter() {
        console.log("refilter")
        // console.log(data);
        if (data && data.configurationMany) {
            let filteredConfigurations = filterConfigurations(data.configurationMany);
            setFilteredConfigurations(filteredConfigurations);
            console.log("refilter done")
        }
    }

    React.useEffect(() => {
        refilter();
    }, [props.category, selectedTenant, showDeleted, data]);

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
        // console.log(checked);
        setShowDeleted(checked)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
            // gather confogurationVersionIds
            let selectedConfigurationVersionIds =  selectedRows.map(row => row.configurationVersionId);
            setSelectedConfigurationVersions(selectedConfigurationVersionIds);
            //console.log(selectedConfigurationVersionIds)
        }
    };

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    function addToDeployment(data) {
        // get Ids of all configVersions assigned to this deployment
        let deploymentConfigurationVersionIds = data.configurationVersions.map(configurationVersion => configurationVersion._id)
        console.log("assigned config version ids");
        console.log(deploymentConfigurationVersionIds);

        // get existing configurationVersions on deployment
        // find out which configVersion Ids needs to be added
        let configurationVersionsToAddToDeployment = selectedConfigurationVersions.filter(id => deploymentConfigurationVersionIds.indexOf(id) === -1);
        console.log("ids to add");
        console.log(configurationVersionsToAddToDeployment);

        // add new configs to existing configurationVersions 
        let finalConfigurationVersions = deploymentConfigurationVersionIds.concat(configurationVersionsToAddToDeployment);
        console.log("final ids");
        console.log(finalConfigurationVersions);

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
                    <Button disabled={selectedRows.length === 0} onClick={openModal}>+ Deployment</Button>
                </Space>
            </div>
            <AddToDeploymentModal
                showModal={isModalVisible}
                onClose={closeModal}
                onAdd={addToDeployment}
            />
            {
                error && <span>{error}</span>
            }
            <Table
                rowKey="id"
                loading={loading}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={columns}
                dataSource={filteredConfigurations}
                onChange={onChange}
                pagination={
                    { pageSize: 25 }
                }
            />
            <span>Show Deleted <Switch onChange={switchShowDeleted} /></span >
        </DefaultPage>
    );
}