import {
    notification
} from 'antd';

const noteConfig = {
    placement: 'topLeft',
    duration: 2
}

const notificationList = {
    wrongPassword: () => {
        notification['error']({
            message: 'Wrong password',
            ...noteConfig
        })
    },
    loginSuccess: () => {
        notification['success']({
            message: 'Logged in',
            description: 'You are successfuly logged in',
            ...noteConfig
        })
    },
    loginFailed: () => {
        notification['error']({
            message: 'Login failed',
            description: 'Login or password are incorrect',
            ...noteConfig

        })
    },
    logout: () => {
        notification['info']({
            message: "You are now logged out",
            ...noteConfig
        })
    },

    resultAddedSuccessfuly: () => {
        notification['success']({
            message: 'Result created',
            description: 'Result has been created successfuly',
            ...noteConfig
        })
    },
    resultAddingFailed: () => {
        notification['error']({
            message: 'Result creation failed',
            ...noteConfig
        })
    },
    registrationComplete: () => {
        notification['success']({
            message: 'Registration complete',
            description: 'You are now logged in',
            ...noteConfig
        })
    },
    registrationFailed: (errorText) => {
        const message = ~errorText.search(/login/g) ? 'Login already in use' : ~errorText.search(/email/g) ?
            'Email already in use' : null
        notification['error']({
            message: 'Registration failed',
            description: message,
            ...noteConfig
        })
    },
    unauthorized: () => {
        notification['warning']({
            message: 'You need to log in first',
            ...noteConfig
        });
    },
    alreadyAuhtorized: () => {
        notification['error']({
            message: 'You are already logged in',
            ...noteConfig
        })
    },
    passwordIncorrect: () => {
        notification['error']({
            message: 'Password confirmation failed',
            ...noteConfig
        })
    },
    fieldsValidationFailed: () => {
        notification['error']({
            message: 'Validation failed, please, check fields one more time',
            ...noteConfig
        })
    },
    userUpdated: () => {
        notification['success']({
            message: 'User info successuly updated',
            ...noteConfig
        })
    },
    passwordUpdated: () => {
        notification['success']({
            message: 'Password successuly updated, now you need to log in again',
            ...noteConfig
        })
    },
    resultDeleted: () => {
        notification['success']({
            message: 'Note has been deleted',
            ...noteConfig
        })
    }
}

export default notificationList