import React from "react";
import {Icon, Popover} from "antd";
import './User.css'
import WrappedNormalLoginForm from "./user/Login";

export default function User() {
  return (
    <Popover placement={"bottomRight"} content={<WrappedNormalLoginForm/>}>
      <Icon className={'header__user-icon'} type="user"/>
    </Popover>
  )
}