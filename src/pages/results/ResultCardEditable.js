/* eslint-disable no-undef */
import React, {useState} from "react";
import {Card, Icon, Input, DatePicker} from "antd";
import moment from "moment";
import api from "../../helpers/api";
import { useDispatch } from "react-redux";
import { setResultsData, setIsEditing } from "../../modules/redResults";
import imgPlaceholder from '../../imgs/image-placeholder.jpg'

const {TextArea} = Input;
const {Meta} = Card;

export default function ResultCardEditable({data = {}, handleEdit}) {
  console.log(process.env)
  const {id, name, date, doctorName: doctor, note} = data;
  //states
  const [inputDate, setInputDate] = useState(date);
  const [inputDoctor, setInputDoctor] = useState(doctor);
  const [inputName, setInputName] = useState(name);
  const [inputNote, setInputNote] = useState(note);
  const mainImg = data.imgsPaths[0] ? process.env.REACT_APP_BACKEND_PATH + data.imgsPaths[0] : imgPlaceholder

  const dispatch = useDispatch()
  const saveResult = async () => {
    await api.updateResult({id, date: inputDate, doctorName: inputDoctor, name: inputName, note: inputNote});
    setResultsData(dispatch)()
    dispatch(setIsEditing({}))
  }
  //handlers
  const handleInput = (setState) => (e) => {
    setState(e.target.value)
  };
  //TODO: сделать редактируемым изображение
  return (
    <Card style={{width: 300}}
          cover={
            <img alt="example" src={mainImg}/>
          }
          actions={[
            <Icon onClick={saveResult} type="save" key="save"/>,
            <Icon onClick={handleEdit()} type="rollback" key="rollback"/>,
          ]}>
      <Meta
        description={
          <>
            <Input onChange={handleInput(setInputName)} value={inputName}/>
            <DatePicker value={moment(inputDate)} onChange={time => setInputDate(time)}/>
            <Input onChange={handleInput(setInputDoctor)} value={inputDoctor}/>
            <TextArea onChange={handleInput(setInputNote)} value={inputNote}/>
          </>
        }/>
    </Card>
  )
}