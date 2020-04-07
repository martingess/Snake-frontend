import React from 'react';
import { Button, Input, Form } from 'antd';
import api from '../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/redLogin';
import { useHistory } from 'react-router-dom';
import validators from '../helpers/validators'

function UserPage(p) {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        const result = await api.deleteUser();
        console.log(result)
        dispatch(logout())
    }
    const { getFieldDecorator } = p.form

    const handleSubmit = (e) => {

    }

    return (
        <>
            <div>Here you can update your profile</div>
            <div>Name:</div>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name')
                        (<Input
                            placeholder="Enter new name"
                        />)
                    }
                </Form.Item>

                <div>Email:</div>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: validators.email
                    })(
                        <Input placeholder="Enter new email" />
                    )}
                </Form.Item>

                <div>Password:</div>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: validators.password
                    })(
                        <Input.Password placeholder="Enter your new password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('passwordCheck', {
                        rules: validators.password
                    })(
                        <Input.Password placeholder="Repeat your new password once more" />
                    )}
                </Form.Item>
                <Button htmlType="submit">Save changes</Button>
            </Form>
            <Button onClick={handleDelete} type='danger'>Delete User</Button>
        </>
    )
}

const WrappedUserPage = Form.create({name: 'userPage'})(UserPage);

export default WrappedUserPage