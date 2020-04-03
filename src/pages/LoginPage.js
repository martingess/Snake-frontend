import React from 'react';
import Login from '../components/Login';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function (){
    const isLoogedIn = useSelector(state=>state.login.status === 'done')
    const history = useHistory();
    if(isLoogedIn) history.push('/')
    return (
        <Login />
    )
}