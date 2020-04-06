import {notification } from 'antd';

const notificationList = {
    loginSuccess: () => {
        notification['success']({
            message: 'Logged in',
            description: 'You are successfuly logged in',
            placement: 'topLeft',
            duration: 2
        })
    },
    loginFailed: () => {
        notification['error']({
            message: 'Login failed',
            description: 'Login or password are incorrect',
            placement: 'topLeft',
            duration: 2

        })
    },
    logout: ()=>{
        notification['info']({
            message: "You are now logged out",
            duration: 2,
            placement: 'topLeft'
        })
    },

    resultAddedSuccessfuly: () => {
        notification['success']({
            message: 'Result created',
            description: 'Result has been created successfuly',
            placement: 'topLeft',
            duration: 2

        })
    },
    resultAddingFailed: () => {
        notification['error']({
            message: 'Result creation failed',
            placement: 'topLeft',
            duration: 2
        })
    },
    registrationComplete: ()=>{
        notification['success']({
            message: 'Registration complete',
            description: 'You are now logged in',
            placement: 'topLeft',
            duration: 2
        })
    },
    registrationFailed: ()=>{
        notification['error']({
            message: 'Registration failed',
            description: 'Something went wrong, maby check fields again?',
            placement: 'topLeft',
            duration: 2
        })
    },
    unauthorized: ()=>{
        notification['error']({
            message: 'You need to log in first',
            placement: 'topLeft',
            duration: 2
        });
    },
    alreadyAuhtorized: () => {
        notification['error']({
            message: 'You are already logged in',
            placement: 'topLeft',
            duration: 2
        })
    }
}

export default notificationList