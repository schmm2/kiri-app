import React, { useState } from "react";
import { Modal, Dropdown, Button, Menu, Input } from 'antd';
import { useQuery } from '@apollo/client';
import { tenantMany } from "graphql/queries";
import { apipost } from 'util/api';

export const CopyConfigurationModal = ({ configurationDisplayName, selectedTenant, showModal, onCopy, onClose }) => {

    const [selectedTenantInModal, setSelectedTenantInModal] = useState(null);
    let input = React.createRef();

    const handleOk = (e) => {
        onCopy({
            targetTenant: selectedTenantInModal,
            // https://reactjs.org/docs/uncontrolled-components.html
            newConfigName: input.current.state.value
        });
        onClose(e);
    };

    const handleCancel = (e) => {
        onClose(e);
    };

    const { data } = useQuery(tenantMany, {
        fetchPolicy: 'cache-and-network',
    });

    const tenantMenu = (
        <Menu>
            {data && data.tenantMany.map((item, index) => {
                return (
                    <Menu.Item key={item.id} onClick={() => setSelectedTenantInModal(item)}>
                        {item.name}
                    </Menu.Item>
                )
            })}
        </Menu>
    );

    return (
        <Modal
            title="Copy Configuration"
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Copy">

            <p>Select the target Tenant</p>
            <Dropdown overlay={tenantMenu} placement="bottomCenter" arrow>
                <Button>
                    {selectedTenantInModal
                        ? selectedTenantInModal.name
                        : "Select Tenant"
                    }
                </Button>
            </Dropdown>
            <p>Chose a displayName</p>
            <Input defaultValue={configurationDisplayName} ref={input}/>
        </Modal>
    );
};