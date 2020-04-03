import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { softLogin } from '../modules/redLogin';
import jwt from 'jwt-decode';
import api from '../helpers/api';
import { useHistory } from 'react-router-dom';
import notification from '../helpers/notification';

function RegisterPage(p) {
    const dispatch = useDispatch()
    const { getFieldDecorator } = p.form;
    const isAnomymous = useSelector(state=> state.login.status === 'anomymous' )
    const history = useHistory();
    if(!isAnomymous) history.push('/')
    return (<>
        {isAnomymous ? <>
        <div>Register</div>
        <Form onSubmit={(e) => {
            e.preventDefault();
            p.form.validateFields((err, values) => {
                (async () => {
                    const user = await api.register(values)
                    //TODO: добавить валидацию пароль там и логин
                    try {
                        jwt(user)
                        localStorage.setItem('authToken', user)
                        dispatch(softLogin())
                        notification.registrationComplete();
                        return
                    } catch (err) {
                        console.log('some error occured')
                        notification.registrationFailed();
                        return
                    }
                })()
            })
        }}>
            //TODO: добавить валидаторов ввода на фронте
            <Form.Item>
                <p>Username:</p>
                {getFieldDecorator('login')(<Input />)}
            </Form.Item>
            <Form.Item>
                <p>Password:</p>
                {getFieldDecorator('password')(<Input />)}
            </Form.Item>
            <Form.Item>
                <p>email:</p>
                {getFieldDecorator('email')(<Input />)}
            </Form.Item>
            <Form.Item>
                <p>Your name:</p>
                {getFieldDecorator('name')(<Input />)}
            </Form.Item>
            <Button htmlType='submit' >Register me now!</Button>
        </Form>
    </> : <div>You already logged in</div> }
    </>
    )
}

const WrappedRegisterPage = Form.create({ name: 'register' })(RegisterPage)
export default WrappedRegisterPage