import React from "react";
import { Layout, Row, Col, Button } from "antd";
import Menu from "./header/Menu";
import Search from "./header/Search";
import User from "./header/User";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ApproveMenu from "./header/ApproveMenu";
import logo from "../imgs/logo.svg";
import api from "../helpers/api";
import "./Header.css";

const { Header: AntHeader } = Layout;

//TODO: имплементировать style={{position: 'fixed', width: '100vw', zIndex: 1, margin: "10px"}}
export default function Header() {
  const loginState = useSelector((state) => state.login);
  const isLoggedIn = loginState.status === "done";
  const isDoctor = loginState.data && loginState.data.role === "doctor";
  const handleSearch = (setSearchResult, setIsVisible) => async (value) => {
    const searchResultFetch = await api.search(value);
    if (searchResultFetch.data.search) {
      setSearchResult(searchResultFetch.data.search);
    } else setSearchResult([]);
    setIsVisible(true);
  };

  return (
    <AntHeader style={{ height: "auto" }} className={"header"}>
      <Row type={"flex"} align={"middle"} justify="center">
        <Col lg={4} xs={{ span: 24 }}>
          <div className="Header__logo" style={{ textAlign: "center" }}>
            <a href="/">
              <img
                src={logo}
                alt="logo"
                style={{ maxHeight: "55px", maxWidth: "55px" }}
              />
            </a>
          </div>
        </Col>
        <Col
          className="Header_menu"
          style={{ textAlign: "center" }}
          lg={6} xs={{ span: 24 }}
        >
          <Menu isDoctor={isDoctor} />
        </Col>
        <Col className="Header__search" lg={4} xs={{ span: 24, offset: 1 }}>
          <Search handleSearch={handleSearch} placeholder={"Найти результат"} />
        </Col>
        <Col
          className="Header__button"
          style={{ textAlign: "center" }}
          lg={4} xs={{ span: 24 }}
        >
          {!isLoggedIn ? (
            <Button type={"primary"}>
              <Link to={"/register"}>Регистрация</Link>
            </Button>
          ) : isDoctor ? (
            <ApproveMenu />
          ) : (
            <Button type={"primary"}>
              <Link to={"/addResult"}>Добавить результат</Link>
            </Button>
          )}
        </Col>
        <Col
          className="Header__user"
          style={{ textAlign: "center", paddingTop: 12 }}
          lg={2} xs={{ span: 12 }}
        >
          <User />
        </Col>
      </Row>
    </AntHeader>
  );
}
