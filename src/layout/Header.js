import React from "react";
import {Layout, Row, Col, Input, Button, Icon} from "antd";
import Menu from "./header/header/Menu";
import Search from "./header/header/Search";
import User from "./header/header/User";

const {Header: AntHeader} = Layout;

export default function Header() {
  return <AntHeader className={'header'}>
    <Row type={"flex"} align={"middle"}>
      <Col span={2} offset={1}>
        <div>logo</div>
      </Col>
      <Col span={5} offset={1}>
        <Menu/>
      </Col>
      <Col span={5} offset={1}>
        <Search/>
      </Col>
      <Col span={5} offset={1}>
        <Button type={"primary"}>
          Добавить результат
        </Button>
      </Col>
      <Col span={3}>
        <User/>
      </Col>
    </Row>
  </AntHeader>
}