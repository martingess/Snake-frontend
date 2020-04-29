import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { softLogin } from '../modules/redLogin';
import api from '../helpers/api';
import notification from '../helpers/notification';
import validators from '../helpers/validators';

function RegisterPage(p) {
  const dispatch = useDispatch();
  const { getFieldDecorator } = p.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    p.form.validateFields((err, values) => {
      if (!err) {
        const formData = {};
        for (let value in values) {
          console.log(values[value]);
          if (values[value] && value !== 'passwordCheck')
            formData[value] = values[value];
          console.log(formData);
        }

        (async () => {
          const user = await api.register(formData);
          try {
            localStorage.setItem('authToken', user.data.createUser);
            dispatch(softLogin());
            notification.registrationComplete();
            return;
          } catch (err) {
            
            notification.registrationFailed();
            return;
          }
        })();
      }
    });
  };

  return (
    <>
      <div>Register</div>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <p>Username:</p>
          {getFieldDecorator('login', { rules: validators.username })(
            <Input />,
          )}
        </Form.Item>
        <Form.Item>
          <p>Password:</p>
          {getFieldDecorator('password', {
            rules: validators.password,
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item>
          <p>Repeat password:</p>
          {getFieldDecorator('passwordCheck', {
            rules: validators.repeatPassword(p),
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item>
          <p>email:</p>
          {getFieldDecorator('email', { rules: validators.email })(
            <Input />,
          )}
        </Form.Item>
        <Form.Item>
          <p>Your name:</p>
          {getFieldDecorator('name')(<Input />)}
        </Form.Item>
        <Form.Item>
          <p>Role:</p>
          {getFieldDecorator('role', {initialValue: "patient"})(
            <Select>
              <Select.Option value="patient">Patient</Select.Option>
              <Select.Option value="doctor">Doctor</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Button htmlType="submit">Register me now!</Button>
      </Form>
    </>
  );
}

const WrappedRegisterPage = Form.create({ name: 'register' })(
  RegisterPage,
);
export default WrappedRegisterPage;
