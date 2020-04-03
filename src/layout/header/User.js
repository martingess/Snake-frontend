import React, {useState} from "react";
import { Icon, Popover } from "antd";
import './User.css'
import WrappedNormalLoginForm from "../../components/Login";
import { connect } from "react-redux";
import UserCard from "./user/UserCard";
import { useHistory, Link } from "react-router-dom";

function User({ state, dispatch }) {
  const history = useHistory();
  const isLogedIn = state.login.status === 'done'
  const onClickPath = isLogedIn ? '/user' : '/login'
  const [visible, setVisible] = useState(false);
  const handleOnClick = () => {
    history.push(onClickPath)
    setVisible(false)
  }
  const handleVisible = (visible) => {
    setVisible(visible);
  }
  return ( history.location.pathname === '/login' ?
  <Icon className={'header__user-icon'} type="user" onClick={handleOnClick}/>
  :
    <Popover placement={"bottomRight"} content={
      (isLogedIn
      && <UserCard dispatch={dispatch} user={state.login.data} />)
      || <WrappedNormalLoginForm />
      }
      visible={visible}
      onVisibleChange={handleVisible}>
        <Icon className={'header__user-icon'} type="user" onClick={handleOnClick}/>
    </Popover>
  )
}

export default connect(
  state => ({ state: state }),
  dispatch => ({ dispatch }))(User);