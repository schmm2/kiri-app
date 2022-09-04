import { notification } from "antd";

const openNotificationWithIcon = (title, description, type, duration = 5) => {
    notification[type]({
        message: title,
        description: description,
        duration: duration
    });
};


export { openNotificationWithIcon }