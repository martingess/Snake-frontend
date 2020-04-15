import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import Menu from './header/Menu';
import Search from './header/Search';
import User from './header/User';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import ApproveMenu from './header/ApproveMenu';
const { Header: AntHeader } = Layout;

//TODO: имплементировать style={{position: 'fixed', width: '100vw', zIndex: 1, margin: "10px"}}
export default function Header() {
  const isLoggedIn = useSelector(
    (state) => state.login.status === 'done',
  );

  const isDoctor = useSelector(
    (state) => state.login.status === 'done',
  )
    ? jwt(localStorage.authToken).role === 'doctor'
    : false;

  return (
    <AntHeader className={'header'}>
      <Row type={'flex'} align={'middle'}>
        <Col span={2} offset={1}>
          <div>logo</div>
        </Col>
        <Col span={4} offset={1}>
          <Menu isDoctor={isDoctor} />
        </Col>
        <Col span={5} offset={1}>
          <Search />
        </Col>
        <Col span={3} offset={3}>
          {!isLoggedIn ? (
            <Button type={'primary'}>
              <Link to={'/register'}>Регистрация</Link>
            </Button>
          ) : isDoctor ? <ApproveMenu /> : (
            <Button type={'primary'}>
              <Link to={'/addResult'}>Добавить результат</Link>
            </Button>
          )}
        </Col>
        <Col span={3} offset={1}>
          <User />
        </Col>
      </Row>
    </AntHeader>
  );
}
