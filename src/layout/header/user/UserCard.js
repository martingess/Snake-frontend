import React from "react";
import {Card, Icon, Avatar} from 'antd';
import {logout} from "../../../modules/redLogin";
import notification from "../../../helpers/notification";
import { useHistory } from "react-router-dom";
import { clearApproveResults } from "../../../modules/redDoctor";
import { clearResults } from "../../../modules/redResults";

const {Meta} = Card;

export default function UserCard (p) {
  const {user, dispatch} = p
  const history = useHistory()
  return (
     <div>
        <Card
          style={{width: 300, marginTop: 16}}
          actions={[
            <Icon onClick={() => {history.push('/user')}} type="setting" key="setting"/>,
            <Icon onClick={() => {
              history.push('/')
              dispatch(logout())
              dispatch(clearApproveResults())
              dispatch(clearResults());
              notification.logout()
            }} type="logout" key="logout"/>,
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
      </div>)
  }

// export default class UserCard extends React.Component {

//   render() {
//     console.log(this.props)
//     const {user, dispatch} = this.props
//     const history = useHistory()
//     return (
//       <div>
//         <Card
//           style={{width: 300, marginTop: 16}}
//           actions={[
//             <Icon onClick={() => history.push('/user')} type="setting" key="setting"/>,
//             <Icon onClick={() => {
//               dispatch(logout())
//               notification.logout()
//             }} type="logout" key="logout"/>,
//           ]}
//         >
//           <Meta
//             avatar={
//               <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
//             }
//             title={user.login}
//             description="You are now logged in"
//           />
//         </Card>
//       </div>
//     );
//   }
// }
