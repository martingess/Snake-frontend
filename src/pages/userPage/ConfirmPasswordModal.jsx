import React, { useState } from "react";
import { Modal, Input } from "antd";
import notificationList from "../../helpers/notification";
import { logout } from "../../modules/redLogin";
import api from "../../helpers/api";

export default function ConfirmPasswordModal(p) {
  const { visible, dispatch, setVisible, validateFields, resetFields } = p;
  const [passwordToProcess, setPasswordToProcess] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      visible={visible}
      confirmLoading={loading}
      title="Confirm your current password to continue."
      onOk={async () => {
        setLoading(true);
        try {
          validateFields(async (err, values) => {
            if (!err) {
              const formData = { password: passwordToProcess };
              for (let value in values) {
                if (values[value] && value !== "passwordCheck")
                  formData[value] = values[value];
              }
              const startFetch = Date.now();
              const res = await api.updateUser(formData);
              const endFetch = Date.now();
              if (endFetch - startFetch < 400)
                await new Promise((res) => setTimeout(res, 500)); //for better button animation
              if (
                res.errors &&
                res.errors[0] &&
                ~res.errors[0].message.search(/wrong password/i)
              ) {
                setLoading(false);
                return notificationList.wrongPassword();
              }
              if (values.newPassword) {
                dispatch(logout());
                notificationList.passwordUpdated();
              } else {
                notificationList.userUpdated();
                setVisible(false);
              }
              setLoading(false);
              resetFields();
            }
          });
        } catch (err) {
          notificationList.passwordIncorrect();
          setPasswordToProcess("");
          setVisible(false);
        }
      }}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Input.Password
        value={passwordToProcess}
        placeholder="Your current password"
        onChange={(e) => {
          setPasswordToProcess(e.target.value);
        }}
      />
    </Modal>
  );
}
