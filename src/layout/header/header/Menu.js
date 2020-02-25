import React from "react";
import {Menu as MenuAnt} from 'antd'
export default function Menu() {
  return (
    <MenuAnt mode={'horizontal'}>
      <MenuAnt.Item>
        Main page
      </MenuAnt.Item>
      <MenuAnt.Item>
        About us
      </MenuAnt.Item>
    </MenuAnt>
  )
}