/* eslint-disable no-undef */
import React from "react";
import { Card, Icon } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import imgPlaceholder from "../../imgs/image-placeholder.jpg";
import "./ResultCard.css";
const { Meta } = Card;

export default function ResultCard({
  data,
  handleEdit,
  handleDelete,
  isNotOwner,
}) {
  const { id, name, date, doctorName, note, user } = data;
  const history = useHistory();
  const mainImg = data.imgsPaths[0]
    ? process.env.REACT_APP_BACKEND_PATH + data.imgsPaths[0]
    : imgPlaceholder;
  let stringDate = moment(date).format("MMMM Do YYYY");
  if (stringDate === "Invalid date") {
    stringDate = moment(parseInt(date, 10)).format("MMMM Do YYYY");
  }
  return (
    <Card
      style={{
        margin: "0 auto",
        width: "300px",
      }}
      className={"result__card"}
      hoverable
      cover={<img alt="example" src={mainImg} />}
      actions={
        isNotOwner
          ? []
          : [
              <Icon onClick={handleEdit(id)} type="edit" key="edit" />,
              <Icon onClick={handleDelete(id)} type="delete" key="delete" />,
            ]
      }
      onClick={() => history.push(`/showResult:${id}`)}
    >
      <Meta
        title={<h3>{name}</h3>}
        description={
          <div>
            {date && <div>Дата: {stringDate}</div>}
            {doctorName && <div>Врач: {doctorName}</div>}
            {isNotOwner && <div>Пациент: {user.name}</div>}
            {note && (
              <div className={"result__card-description"}>Заметки: {note}</div>
            )}
          </div>
        }
      />
    </Card>
  );
}
