import React from "react";
import {Card, Icon} from "antd";
import {useHistory} from 'react-router-dom'
const {Meta} = Card;

export default function ResultCard({data, handleEdit, handleDelete}) {
const {id, name, date, doctorName, note} = data;
const history = useHistory();
return (
  <Card hoverable style={{width: 300}}
        cover={
          <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
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
              <div>{Date(date)}</div>
              <div>Doctor: {doctorName}</div>
              {note && <div>Notes: {note}</div>}
            </>
          }
    />
</Card>)}