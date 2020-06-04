import React from "react";
import { Button, Input, Form, Modal } from "antd";
import api from "../helpers/api";
import { useDispatch } from "react-redux";
import { logout } from "../modules/redLogin";
import validators from "../helpers/validators";
import { useState } from "react";
import { clearResults } from "../modules/redResults";
import ConfirmPasswordModal from "./userPage/ConfirmPasswordModal";

function UserPage(p) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await api.deleteUser();
    dispatch(logout());
    dispatch(clearResults());
  };
  const { getFieldDecorator, validateFields, resetFields } = p.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {})();
  };
  const [visible, setVisible] = useState(false);
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
          {getFieldDecorator("name")(<Input placeholder="Enter new name" />)}
        </Form.Item>

        <div>Email:</div>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: validators.email,
          })(<Input placeholder="Enter new email" />)}
        </Form.Item>

        <div>Password:</div>
        <Form.Item>
          {getFieldDecorator("newPassword", {
            rules: validators.password,
          })(<Input.Password placeholder="Enter your new password" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("passwordCheck", {
            rules: validators.repeatPassword(p, "newPassword"),
          })(
            <Input.Password placeholder="Repeat your new password once more" />
          )}
        </Form.Item>
        <Button onClick={showConfirm}>Save changes</Button>
      </Form>
      <Button onClick={handleDelete} type="danger">
        Delete User
      </Button>
      <ConfirmPasswordModal
        visible={visible}
        resetFields={resetFields}
        dispatch={dispatch}
        setVisible={setVisible}
        validateFields={validateFields}
      />
    </>
  );
}

const WrappedUserPage = Form.create({ name: "userPage" })(UserPage);

export default WrappedUserPage;
