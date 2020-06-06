/* eslint-disable no-undef */
import React, { useState } from "react";
import { Card, Icon, Input, DatePicker, Button, List } from "antd";
import moment from "moment";
import api from "../helpers/api";
import { useDispatch } from "react-redux";
import { setResultsData, setIsEditing as reduxSetIsEditing } from "../modules/redResults";
import imgPlaceholder from "../imgs/image-placeholder.jpg";
import getMomentObj from "../helpers/getMomentObj";

const { TextArea } = Input;
const { Meta } = Card;

export default function ResultCardEditable({ data = {}, handleEdit, setIsEditing, card }) {
  const { id, name, date, doctorName: doctor, note } = data;
  //states
  const [inputDate, setInputDate] = useState(date);
  const [inputDoctor, setInputDoctor] = useState(doctor);
  const [inputName, setInputName] = useState(name);
  const [inputNote, setInputNote] = useState(note);
  console.log(data, 'data')
  const mainImg = data.imgsPaths[0]
    ? process.env.REACT_APP_BACKEND_PATH + data.imgsPaths[0]
    : imgPlaceholder;

  const dispatch = useDispatch();
  const saveResult = async () => {
    await api.updateResult({
      id,
      date: inputDate,
      doctorName: inputDoctor,
      name: inputName,
      note: inputNote,
    });
    setResultsData(dispatch)();
    if(card) {
      dispatch(reduxSetIsEditing());
    } else {
      setIsEditing(false);
    }
  };
  //handlers
  const handleInput = (setState) => (e) => {
    setState(e.target.value);
  };
  const editableElement = (
    <>
      <p>Название анализа:</p>
      <Input onChange={handleInput(setInputName)} value={inputName} />
      <p>Дата: </p>
      <DatePicker
        value={getMomentObj(inputDate)}
        onChange={(time) => setInputDate(time)}
      />
      <p>Врач:</p>
      <Input onChange={handleInput(setInputDoctor)} value={inputDoctor} />
      <p>Заметки:</p>
      <TextArea onChange={handleInput(setInputNote)} value={inputNote} />
    </>
  );

  if (!card) {
    return (
      <div>
        {editableElement}
        <Button onClick={saveResult}>Сохранить</Button>
        <Button onClick={()=>setIsEditing(false)}>Отменить</Button>
      </div>
    );
  }
  if (card) {
    return (
      <Card
        style={{ maxWidth: 300 }}
        cover={<img alt="example" src={mainImg} />}
        actions={[
          <Icon onClick={saveResult} type="save" key="save" />,
          <Icon onClick={handleEdit()} type="rollback" key="rollback" />,
        ]}
      >
        <Meta description={editableElement} />
      </Card>
    );
  }
}
