import React from "react";
import { Form, Icon, Input, Button, Checkbox, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { login } from "../modules/redLogin";
import { Link } from "react-router-dom";
import notification from '../helpers/notification'

function LoginForm(p) {
  const { store } = p
    if (store.login.status === 'loading') {
      return <Row><Col span={4} offset={10} ><Spin size="large" /></Col></Row>
    }
    const { getFieldDecorator } = p.form;
    const handleSubmit = e => {
      e.preventDefault();
      p.form.validateFields((err, values) => {
        if (!err) {
          (async () => {
            const { tryLogin } = p;
            const result = await tryLogin(values.username, values.password, values.remember);
            if (result) notification.loginSuccess();
            else notification.loginFailed();
          })()
        }
      });
    };
  return ( 
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    )
  }

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

// WrappedNormalLoginForm;
export default connect(store => ({ store }), dispatch => ({ tryLogin: login(dispatch) }))(WrappedNormalLoginForm)