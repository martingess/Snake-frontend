import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { softLogin } from "../modules/redLogin";
import api from "../helpers/api";
import notification from "../helpers/notification";
import validators from "../helpers/validators";

function RegisterPage(p) {
  const dispatch = useDispatch();
  const { getFieldDecorator } = p.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    p.form.validateFields((err, values) => {
      if (!err) {
        const formData = {};
        for (let value in values) {
          if (values[value] && value !== "passwordCheck")
            formData[value] = values[value];
        }
        //TODO: нужно пересмотреть эту функцию, не нравится что она анонимная
        (async () => {
          const user = await api.register(formData);
          try {
            if (!user.data.createUser) {
              throw user;
            }
            dispatch(softLogin(user.data.createUser));
            notification.registrationComplete();
            return;
          } catch (err) {
            notification.registrationFailed(user.errors[0].message);
            return;
          }
        })();
      }
    });
  };

  return (
    <>
      <div>Register</div>
      <Row>
        <Col offset={6} span={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <p>Username:</p>
              {getFieldDecorator("login", {
                rules: [
                  ...validators.userName,
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <p>Password:</p>
              {getFieldDecorator("password", {
                rules: [
                  ...validators.password,
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item>
              <p>Repeat password:</p>
              {getFieldDecorator("passwordCheck", {
                rules: validators.repeatPassword(p, 'password'),
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item>
              <p>email:</p>
              {getFieldDecorator("email", {
                rules: [
                  ...validators.email,
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <p>Your name:</p>
              {getFieldDecorator("name", { rules: validators.name })(<Input />)}
            </Form.Item>
            <Form.Item>
              <p>Role:</p>
              {getFieldDecorator("role", { initialValue: "patient" })(
                <Select>
                  <Select.Option value="patient">Patient</Select.Option>
                  <Select.Option value="doctor">Doctor</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Button htmlType="submit">Register me now!</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const WrappedRegisterPage = Form.create({ name: "register" })(RegisterPage);
export default WrappedRegisterPage;
