import React from "react";
import {Menu as MenuAnt} from 'antd'
import {Link} from "react-router-dom";

export default function Menu() {
  return (
    <MenuAnt mode={'horizontal'}>
      <MenuAnt.Item>
        <Link to={'/'}>
          Results
        </Link>
      </MenuAnt.Item>
      <MenuAnt.Item>
        <Link to={'/about'}>
          About us
        </Link>
      </MenuAnt.Item>
    </MenuAnt>
  )
}