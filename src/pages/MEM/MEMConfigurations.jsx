import React, { useContext, useState, useEffect } from "react";
import { getNewestConfigurationVersions } from "graphql/queries";
import { Table, Switch, Space, Button, Input } from 'antd';
import { Link } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { AddToDeploymentModal } from "components/AddToDeploymentModal";
import DefaultPage from "layouts/DefaultPage";
import { deploymentUpdateOne as deploymentUpdateOneMutation } from "graphql/mutations"
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { DeleteModal } from "components/DeleteModal";
import { postBackendApi } from 'util/api';

export default function MEMConfigurations(props) {

    // states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [configurations, setConfigurations] = useState([]);
    const [filteredConfigurations, setFilteredConfigurations] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedConfigurations, setSelectedConfigurations] = useState([]);
    const [queryFilter, setQueryFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    const selectedTenant = useContext(TenantContext);
    let searchInput = React.createRef();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        }
    });

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

                if (configuration.newestConfigurationVersion) {
                    let newConfigurationObject = {};
                    let configurationVersion = configuration.newestConfigurationVersion;

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
                    newConfigurationObject.tenantName = configuration.tenant.name;
                    newConfigurationObject.tenantDbId = configuration.tenant._id;

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
        onCompleted: (data) => {
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
            console.log(filteredConfigurations);
            console.log("refilter done")
        }
    }

    useEffect(() => {
        console.log(selectedTenant);
        console.log("get configurations...")

        if (selectedTenant) {
            getConfigurations({
                variables: {
                    filter: {
                        tenant: selectedTenant._id
                    },
                    limit: 200
                }
            });
        } else {
            getConfigurations({
                variables: {
                    limit: 500
                }
            });
        }
    }, [props.category, selectedTenant]);

    const columns = [
        {
            title: "Name",
            index: "name",
            dataIndex: "displayName",
            render: (text, record) => <Link to={props.category + '/' + record.id} > {record.displayName} </Link>,
            ...getColumnSearchProps('displayName'),
        },
        {
            title: "Tenant",
            index: "tenant",
            dataIndex: "tenantName",
        },
        {
            title: "Type",
            index: "type",
            dataIndex: ["type"],
        },
        {
            title: "Platform",
            index: "platform",
            dataIndex: ["platform"],
        },
        {
            title: "Modified at",
            index: "modifiedat",
            dataIndex: ["modifiedAt"],
            render: (text, record) => renderDate(text),
            sorter: (a, b) => moment(a.modifiedAt).unix() - moment(b.modifiedAt).unix(),
            defaultSortOrder: 'descend',
        }
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    function switchShowDeleted(checked) {
        // console.log(checked);
        setShowDeleted(checked)
        refilter();
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
        /*console.log("assigned config ids");
        console.log(deploymentConfigurationIds);
        console.log(selectedConfigurations);*/

        // get existing configurations on deployment
        // find out which configVersion Ids needs to be added
        let configurationsToAddToDeployment = selectedConfigurations.filter(id => deploymentConfigurationIds.indexOf(id) === -1);
        /*console.log("ids to add");
        console.log(configurationsToAddToDeployment);*/

        // add new configs to existing configurations 
        let finalConfigurations = deploymentConfigurationIds.concat(configurationsToAddToDeployment);
        /*console.log("final ids");
        console.log(finalConfigurations);*/

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

    function triggerConfigurationDeletion() {
        openNotificationWithIcon('Delete Config', 'Job started', 'info');

        let configsToDeletePerTenant = [];

        for (let r = 0; r < selectedRows.length; r++) {
            let tenantId = selectedRows[r].tenantDbId
            let configurationId = selectedRows[r].id

            let filteredArray = configsToDeletePerTenant.filter(container => container.tenantId === tenantId);

            // intialize object
            if (filteredArray.length == 0) {
                configsToDeletePerTenant.push({
                    tenantId: tenantId,
                    configurations: [configurationId]
                })
            } else {
                filteredArray[0].configurations.push(configurationId)
            }
        }

        console.log(configsToDeletePerTenant);

        postBackendApi("orchestrators/ORC1102MEMConfigurationsDelete", configsToDeletePerTenant)
            .then(response => response.json())
            .then(data => {
                //console.log(data);       
            }).catch((error) => {
                console.log(error);
            });
    }

    function closeDeleteModal() {
        setIsDeleteModalVisible(false)
    }

    function openDeleteModal() {
        setIsDeleteModalVisible(true)
    }

    const history = useHistory();

    function openCompareView() {
        console.log(selectedConfigurations);
        let path = 'configurationCompare/' + selectedConfigurations[0] + "/" + selectedConfigurations[1];
        history.push(path);
    }

    return (
        <DefaultPage>
            <h1 > {props.title} </h1>
            <div className="controlTop">
                <Space align="end">
                    <Button disabled={selectedRows.length === 0} onClick={openModal}>+ Deployment</Button>
                    <Button disabled={selectedRows.length !== 2} onClick={openCompareView}>Compare</Button>
                    <Button disabled={selectedRows.length === 0} onClick={openDeleteModal}>Delete</Button>
                </Space>
            </div>
            <AddToDeploymentModal
                showModal={isModalVisible}
                onClose={closeModal}
                onAdd={addToDeployment}
            />
            <DeleteModal
                objectNames={selectedRows.map(row => row.displayName)}
                showModal={isDeleteModalVisible}
                onClose={closeDeleteModal}
                onDelete={triggerConfigurationDeletion}
            />
            {
                error && <span>{JSON.parse(error)}</span>
            }
            <Table
                loading={loading}
                rowKey="id"
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={columns}
                dataSource={filteredConfigurations}
                onChange={onChange}
            />
            <span>Show Deleted <Switch onChange={switchShowDeleted} /></span >
        </DefaultPage>
    );
}