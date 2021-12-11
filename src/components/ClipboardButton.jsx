import React from "react"
import {
    CopyOutlined
} from '@ant-design/icons';

export const ClipboardButton = ({ data }) => {
    function handleClick() {
        navigator.clipboard.writeText(JSON.stringify(data));
    }

    return <button onClick={handleClick}><CopyOutlined /></button>;
}