import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { softLogin } from '../modules/redLogin';
import jwt from 'jwt-decode';

function RegisterPage(p) {
    const dispatch = useDispatch()
    const { getFieldDecorator } = p.form;
    return (<>
        <div>Register</div>
        <Form onSubmit={(e) => {
            e.preventDefault();
            p.form.validateFields((err, value) => {
                (async () => {
                    const result = await fetch('http://localhost:3022/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/JSON',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            query: `mutation {
                                createUser(login:"${value.login}", password:"${value.password}",email:"${value.email}",name:"${value.name}")
                            }`
                        }),
                        variables: {}
                    })
                    const resultJson = await result.json()
                    const user = resultJson && resultJson.data.createUser
                    //TODO: добавить валидацию пароль там и логин
                    try {
                        jwt(user)
                        localStorage.setItem('authToken', user)
                        dispatch(softLogin())
                        return
                    } catch (err) {
                        console.log('some error occured')
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
            <Button htmlType='submit' />
        </Form>
    </>
    )
}

const WrappedRegisterPage = Form.create({ name: 'register' })(RegisterPage)
export default WrappedRegisterPage