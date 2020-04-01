import React from "react";
import {Card, Icon, Avatar} from 'antd';
import {logout} from "../../../modules/redLogin";

const {Meta} = Card;

export default class UserCard extends React.Component {

  render() {
    console.log(this.props)
    const {user, dispatch} = this.props
    return (
      <div>
        <Card
          style={{width: 300, marginTop: 16}}
          actions={[
            <Icon type="setting" key="setting"/>,
            <Icon onClick={() => dispatch(logout())} type="logout" key="logout"/>,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            }
            title={user.login}
            description="You are now logged in"
          />
        </Card>
      </div>
    );
  }
}
