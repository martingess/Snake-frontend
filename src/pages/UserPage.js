import React from 'react';
import { Button, Input, Form, Modal } from 'antd';
import api from '../helpers/api';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/redLogin';
import validators from '../helpers/validators';
import { useState } from 'react';
import notificationList from '../helpers/notification';
import { clearResults } from '../modules/redResults';

function UserPage(p) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await api.deleteUser();
    dispatch(logout());
    dispatch(clearResults());
  };
  const { getFieldDecorator, validateFields } = p.form;
  const [passwordToProcess, setPasswordToProcess] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {})();
  };
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const showConfirm = () => {
    validateFields((err) => {
      if (err) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    });
  };
  return (
    <>
      <div>Here you can update your profile</div>
      <div>Name:</div>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name')(
            <Input placeholder="Enter new name" />,
          )}
        </Form.Item>

        <div>Email:</div>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: validators.email,
          })(<Input placeholder="Enter new email" />)}
        </Form.Item>

        <div>Password:</div>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: validators.password,
          })(
            <Input.Password placeholder="Enter your new password" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordCheck', {
            rules: validators.repeatPassword(p),
          })(
            <Input.Password placeholder="Repeat your new password once more" />,
          )}
        </Form.Item>
        <Button onClick={showConfirm}>Save changes</Button>
      </Form>
      <Button onClick={handleDelete} type="danger">
        Delete User
      </Button>
      <Modal
        visible={visible}
        confirmLoading={loading}
        title="Confirm your current password to continue."
        onOk={async () => {
          setLoading(true);
          //for better button animation
          await new Promise((res) => setTimeout(res, 500));
          try {
            await validateFields(async (err, values) => {
              if (!err) {
                const formData = { password: passwordToProcess };
                for (let value in values) {
                  console.log(values[value]);
                  if (values[value] && value !== 'passwordCheck')
                    formData[value] = values[value];
                  console.log(formData);
                }
                await api.updateUser(formData);
                if (values.password) {
                  dispatch(logout());
                  notificationList.passwordUpdated();
                } else {
                  notificationList.userUpdated();
                }
                setLoading(false);
              }
            });
          } catch (err) {
            notificationList.passwordIncorrect();
            setPasswordToProcess('');
            setVisible(false);
          }
        }}
        onCancel={() => {
          setVisible(false);
        }}>
        <Input.Password
          value={passwordToProcess}
          placeholder="Your current password"
          onChange={(e) => {
            setPasswordToProcess(e.target.value);
          }}
        />
      </Modal>
    </>
  );
}

const WrappedUserPage = Form.create({ name: 'userPage' })(UserPage);

export default WrappedUserPage;
