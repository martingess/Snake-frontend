import React from 'react';
import { Button } from 'antd';
import api from '../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/redLogin';
import { useHistory } from 'react-router-dom';

function UserPage(){
    const isLogedIn = useSelector(state=>state.login.status === 'done')
    const dispatch = useDispatch();
    const history = useHistory()
    const handleDelete = async () => {
        const result = await api.deleteUser();
        console.log(result)
        dispatch(logout())
    }
    return (
        <>
        <div>Here will be some user-settings</div>
        <Button onClick={handleDelete} type='danger'>Delete User</Button>  
    </>
    )
}

export default UserPage