import { notification } from "antd";

const openNotificationWithIcon = (title, description, type) => {
    notification[type]({
        message: title,
        description: description
    });
};


export { openNotificationWithIcon }