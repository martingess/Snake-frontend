import React from "react";
import {Card, Icon} from "antd";
const {Meta} = Card;

export default function ResultCard({data, handleEdit, handleDelete}) {
  const {id, name, date, doctor, note} = data;
  console.log('я рендерюсь');
  return (
    <Card hoverable style={{width: 300}}
          cover={
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
          }
          actions={[
            <Icon onClick={handleEdit(id)} type="edit" key="edit"/>,
            <Icon onClick={handleDelete(id)} type="delete" key="delete"/>,
          ]}
    >
      <Meta title={name}
            description={
              <>
                <div>{date}</div>
                <div>{doctor}</div>
                <div>{note}</div>
              </>
            }
      />
    </Card>);
}