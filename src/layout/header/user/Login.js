import React from "react";
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
import {connect} from 'react-redux'
import {login} from "../../../modules/redLogin";

class NormalLoginForm extends React.Component {
  state = {loginInput: '', passwordInput: ''};
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {tryLogin} = this.props;
        const {loginInput, passwordInput} = this.state;
        tryLogin(loginInput, passwordInput)
      }
    });
  };

  handleInput = (stateName) => (e) => {
    this.setState({[stateName]: e.target.value})
  };

  render() {
    const {state} = this.props
    if (state.login.status === 'loading') {
      return <Spin size="large"/>
    }
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input onChange={this.handleInput('loginInput')}
                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              onChange={this.handleInput('passwordInput')}
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Log in
          </Button>
          Or <a href="https://google.ru">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

// WrappedNormalLoginForm;
export default connect(state => ({state}), dispatch => ({tryLogin: login(dispatch)}))(WrappedNormalLoginForm)