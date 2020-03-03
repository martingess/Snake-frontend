import React from "react";
import {Card, Icon} from "antd";
const {Meta} = Card;

export default function ResultCard({data}) {
  const {name, date, doctor, note} = data;
  return (
    <Card style={{width: 300}}
          cover={
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
          }
          actions={[
            <Icon type="edit" key="edit"/>,
            <Icon type="delete" key="delete"/>,
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