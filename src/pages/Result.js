/* eslint-disable no-undef */
import React, { useRef, useState } from "react";
import { Carousel, Col, Row, Icon, Button, Popover } from "antd";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./Result.css";
import imgPlaceholder from "../imgs/image-placeholder.jpg";
import moment from "moment";
import api from "../helpers/api";
import { Redirect } from "react-router-dom";
import notificationList from "../helpers/notification";
import getDate from "../helpers/getDate";
import ResultCardEditable from "./results/ResultCardEditable";
function Result(p) {
  const store = useSelector((state) => state);
  console.log(store);
  let result;
  const [isEditing, setIsEditing] = useState(false);
  if (store.results.data) {
    result = store.results.data.find(
      (result) => result.id === p.match.params.id.substr(1)
    );
  }
  if (store.login.status != "done" || !result) {
    return <div>Access denied</div>;
  }
  if (!result) {
    return <Spin size="large" />;
  }
  return (
    <>
      <Row type={"flex"} align={"middle"}>
        <Col span={10} offset={1}>
          <CarouselComponent result={result} />
        </Col>
        <Col span={10} offset={1}>
          {isEditing ? <ResultCardEditable data={result} setIsEditing={setIsEditing}/> : <DataComponent setIsEditing={setIsEditing} result={result} />}
        </Col>
      </Row>
    </>
  );
}

// function EditResultData(p) {
//   return (
    
//   )
// }

function DataComponent(p) {
  const {setIsEditing} = p;
  const [visibleDeleteBtn, setVisibleDeleteBtn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleDelete = async () => {
    api.deleteResultById(p.result.id);
    notificationList.resultDeleted();
    setRedirect(true);
  };
  return (
    <div>
      {redirect ? <Redirect to={"/results"}></Redirect> : null}
      <h2>Название: {p.result.name}</h2>
      {p.result.doctorName ? <p>Врач: {p.result.doctorName}</p> : null}
      {p.result.date ? (
        <p>Дата: {getDate(p.result.date)}</p>
      ) : null}
      {p.result.note && <p>Заметки: {p.result.note}</p>}
      <Button onClick={()=> {
        setIsEditing(true)
      }}>Редактировать</Button>
      <Popover
        visible={visibleDeleteBtn}
        trigger={"click"}
        onVisibleChange={(visible) => setVisibleDeleteBtn(visible)}
        content={
          <div>
            <div>Вы точно хотите удалить этот результат?</div>
            <Button type="danger" onClick={handleDelete}>
              Я уверен, удалить.
            </Button>
            <Button>Не уверен.</Button>
          </div>
        }
      >
        <Button type="danger" onClick={() => setVisibleDeleteBtn(true)}>
          Удалить
        </Button>
      </Popover>
    </div>
  );
}

function CarouselComponent(p) {
  const carousel = useRef(null);
  const haveImg = !!p.result.imgsPaths[0];
  const imgs = haveImg ? (
    p.result.imgsPaths.map((img) => (
      <img key={img} src={process.env.REACT_APP_BACKEND_PATH + img} />
    ))
  ) : (
    <img src={imgPlaceholder} />
  );
  const next = () => carousel.current.next();
  const previous = () => carousel.current.prev();
  return (
    <div className="result__carousel">
      {imgs[1] ? (
        <Icon
          type="left-circle"
          className="result__left-arrow"
          onClick={previous}
        />
      ) : null}
      <Carousel
        ref={carousel}
        effect="fade"
        style={{
          textAlign: "center",
          height: "50vh",
          lineHeight: "50vh",
          background: "#364d79",
          overflow: "hidden",
        }}
      >
        {imgs}
      </Carousel>
      {imgs[1] ? (
        <Icon
          type="right-circle"
          className="result__right-arrow"
          onClick={next}
        />
      ) : null}
    </div>
  );
}

export default Result;
