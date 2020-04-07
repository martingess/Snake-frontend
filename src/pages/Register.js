import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { softLogin } from '../modules/redLogin';
import jwt from 'jwt-decode';
import api from '../helpers/api';
import notification from '../helpers/notification';
import validators from '../helpers/validators'
function RegisterPage(p) {
    const dispatch = useDispatch()
    const { getFieldDecorator } = p.form;
    const handleSubmit = (e) => {
        e.preventDefault();
        p.form.validateFields((err, values) => {
            if (!err) {
                const formData = {};
                for (let value in values) {
                    console.log(values[value])
                    if (values[value] && value !== 'passwordCheck') formData[value] = values[value]
                    console.log(formData)
                }

                (async () => {
                    const user = await api.register(formData)
                    try {
                        jwt(user);
                        localStorage.setItem('authToken', user);
                        dispatch(softLogin());
                        notification.registrationComplete();
                        return
                    } catch (err) {
                        console.log('some error occured')
                        notification.registrationFailed();
                        return
                    }
                })()
            }
            notification.registrationFailed();
        })
    }

    return (
        <>
            <div>Register</div>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    <p>Username:</p>
                    {getFieldDecorator('login', { rules: validators.username })(<Input />)}
                </Form.Item>
                <Form.Item>
                    <p>Password:</p>
                    {getFieldDecorator('password', { rules: validators.password })(<Input.Password />)}
                </Form.Item>
                <Form.Item>
                    <p>Repeat password:</p>
                    {getFieldDecorator('passwordCheck', { rules: validators.repeatPassword(p) })(<Input.Password />)}
                </Form.Item>
                <Form.Item>
                    <p>email:</p>
                    {getFieldDecorator('email', { rules: validators.email })(<Input />)}
                </Form.Item>
                <Form.Item>
                    <p>Your name:</p>
                    {getFieldDecorator('name')(<Input />)}
                </Form.Item>
                <Button htmlType='submit' >Register me now!</Button>
            </Form>
        </>
    )
}

const WrappedRegisterPage = Form.create({ name: 'register' })(RegisterPage)
export default WrappedRegisterPage