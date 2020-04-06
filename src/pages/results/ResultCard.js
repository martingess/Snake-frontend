import React from "react";
import {Card, Icon} from "antd";
import {useHistory} from 'react-router-dom'
import moment from "moment";
const {Meta} = Card;

export default function ResultCard({data, handleEdit, handleDelete}) {
const {id, name, date, doctorName, note} = data;
console.log(data)
const history = useHistory();
return (
  <Card hoverable style={{width: 300}}
        cover={
          <img alt="example" src={`http://localhost:3022/${data.imgsPaths[0]}`} />
        }
        actions={[
          <Icon onClick={handleEdit(id)} type="edit" key="edit"/>,
          <Icon onClick={handleDelete(id)} type="delete" key="delete"/>,
        ]}
        onClick={()=> history.push(`/showResult:${id}`)}
  >
    <Meta title={name}
          description={
            <>
              <div>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <div>Doctor: {doctorName}</div>
              {note && <div>Notes: {note}</div>}
            </>
          }
    />
</Card>)}