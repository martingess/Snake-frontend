import React from "react";
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import { connect } from 'react-redux'
import { login } from "../../../modules/redLogin";
import { Link } from "react-router-dom";
import notification from '../../../helpers/notification'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        (async () => {
          const { tryLogin } = this.props;
          const result = await tryLogin(values.username, values.password, values.remember);
          if (result) notification.loginSuccess();
          else notification.loginFailed();
        })()
      }
    });
  };

  render() {
    const { store } = this.props
    if (store.login.status === 'loading') {
      return <Spin size="large" />
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="https://google.ru">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// WrappedNormalLoginForm;
export default connect(store => ({ store }), dispatch => ({ tryLogin: login(dispatch) }))(WrappedNormalLoginForm)