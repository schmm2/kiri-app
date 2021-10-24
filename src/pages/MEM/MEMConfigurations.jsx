import React, { useContext, useState } from "react";
import { getNewestConfigurationVersions } from "graphql/queries";
import { Table, Switch, Space, Button } from 'antd';
import { Link } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { AddToDeploymentModal } from "components/AddToDeploymentModal";
import DefaultPage from "layouts/DefaultPage";
import { deploymentUpdateOne as deploymentUpdateOneMutation } from "graphql/mutations"
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

export default function MEMConfigurations(props) {

    // states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [configurations, setConfigurations] = useState([]);
    const [filteredConfigurations, setFilteredConfigurations] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedConfigurations, setSelectedConfigurations] = useState([]);
    const [queryFilter, setQueryFilter] = useState("");

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

    const [getConfigurations, { loading, error, data }] = useLazyQuery(getNewestConfigurationVersions, {
        onCompleted: () => {
            console.log("done loading");
            refilter();
        },
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
        console.log(selectedTenant);
        if (selectedTenant) {
            getConfigurations({
                variables: {
                    filter: {
                        tenant: selectedTenant
                    }
                }
            });
        } else {
            getConfigurations();
        }
    }, [props.category, selectedTenant, showDeleted]);

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
            setSelectedConfigurations(selectedRowKeys);
        }
    };


    function addToDeployment(data) {
        // get Ids of all configVersions assigned to this deployment
        let deploymentConfigurationIds = data.configurations.map(configuration => configuration._id)
        console.log("assigned config ids");
        console.log(deploymentConfigurationIds);

        // get existing configurations on deployment
        // find out which configVersion Ids needs to be added
        let configurationsToAddToDeployment = selectedConfigurations.filter(id => deploymentConfigurationIds.indexOf(id) === -1);
        console.log("ids to add");
        console.log(configurationsToAddToDeployment);

        // add new configs to existing configurations 
        let finalConfigurations = deploymentConfigurationIds.concat(configurationsToAddToDeployment);
        console.log("final ids");
        console.log(finalConfigurations);

        // update deployment if new configVersions have been found
        if (configurationsToAddToDeployment.length > 0) {
            let parameter = {
                variables: {
                    record: { configurations: finalConfigurations },
                    filter: { _id: data._id }
                }
            }
            updateDeployment(parameter);
        } else {
            openNotificationWithIcon('Add to Deployment', 'no action taken, they are already assigned', 'success');
        }
    }

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
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