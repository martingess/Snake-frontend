import { List, Button } from "antd"
import React from 'react'

function ListOfDoctors({data, handelCancel}) {
  return (
    <List dataSource={data} bordered size={'small'} renderItem={item=>(
      <List.Item>
        <h3>{item.name}</h3>
        <Button onClick={handelCancel(item.id)}>Отменить</Button>
      </List.Item>
    )}/>
  )
}

export default ListOfDoctors
