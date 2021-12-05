import React, { useState } from "react";
import { Modal } from 'antd';


export const DeleteModal = ({ objectNames, showModal, onDelete, onClose }) => {

    const handleOk = (e) => {
        onDelete();
        onClose(e);
    };

    const handleCancel = (e) => {
        onClose(e);
    };


    return (
        <Modal
            title="Delete"
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Delete">

            <p>This action will delete the following objects in the corresponding Tenant:</p>
            <ul>
                {
                    objectNames.map((name) =>
                        <li>{name}</li>
                    )
                }
            </ul>
            <p>Are you sure?</p>
        </Modal>
    );
};