import React, { useState } from "react";
import { Modal, Dropdown, Button, Menu, Select } from 'antd';
import { useQuery } from '@apollo/client';
import { deploymentById, deploymentMany } from "graphql/queries";
const { Option } = Select;

export const AddToDeploymentModal = ({ showModal, onAdd, onClose }) => {

    const [selectedDeployment, setSelectedDeployment] = useState(null);

    const handleOk = (e) => {
        // find deployment object
        let deployment = (data.deploymentMany.filter(deployment => deployment._id == selectedDeployment))[0]
        // return to caller
        onAdd(deployment);
        onClose(e);
    };

    const handleCancel = (e) => {
        onClose(e);
    };

    const { data } = useQuery(deploymentMany, {
        fetchPolicy: 'cache-and-network',
    });

    function handleChange(value) {
        //console.log(value);
        setSelectedDeployment(value);
    }

    return (
        <Modal
            title="Add to Deployment"
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add">

            <p>Select the Deployment</p>
            {
                data && data.deploymentMany &&
                <Select onChange={handleChange}>
                    {
                        data.deploymentMany.map((deployment) =>
                            <Option key={deployment._id}>
                                {deployment.name}
                            </Option>
                        )
                    }
                </Select>
            }
        </Modal>
    );
};