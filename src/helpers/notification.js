import {notification} from 'antd';

const notificationList = {
    loginSuccess: () => {
        notification['success']({
            message: 'Logged in',
            description: 'You are successfuly logged in',
            placement: 'topLeft'
        })
    },
    loginFailed: () => {
        notification['error']({
            message: 'Login failed',
            description: 'Login or password are incorrect',
            placement: 'topLeft'
        })
    },
    resultAddedSuccessfuly: () => {
        notification['success']({
            message: 'Result created',
            description: 'Result has been created successfuly',
            placement: 'topLeft'
        })
    },
    resultAddingFailed: () => {
        notification['error']({
            message: 'Result creation failed',
            placement: 'topLeft'
        })
    }
}

export default notificationList