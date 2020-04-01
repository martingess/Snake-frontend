import React from "react";
import { Icon, Popover } from "antd";
import './User.css'
import WrappedNormalLoginForm from "./user/Login";
import { connect } from "react-redux";
import UserCard from "./user/UserCard";

function User({ state, dispatch }) {
  return (
    <Popover placement={"bottomRight"} content={
      (state.login.status === 'done'
      && <UserCard dispatch={dispatch} user={state.login.data} />)
      || <WrappedNormalLoginForm />
    }>
      <Icon className={'header__user-icon'} type="user" />
    </Popover>
  )
}

export default connect(
  state => ({ state: state }),
  dispatch => ({ dispatch }))(User);