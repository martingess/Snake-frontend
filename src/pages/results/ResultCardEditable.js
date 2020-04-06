import React, {useState} from "react";
import {Card, Icon, Input, DatePicker} from "antd";
import moment from "moment";
import api from "../../helpers/api";
import { useDispatch } from "react-redux";
import { setResultsData, setIsEditing } from "../../modules/redResults";

const {TextArea} = Input;
const {Meta} = Card;

export default function ResultCardEditable({data = {}, handleEdit, isEditing}) {
  const {id, name, date, doctor, note, analyzeType} = data;
  console.log(data)
  //states
  const [inputDate, setInputDate] = useState(date);
  const [inputDoctor, setInputDoctor] = useState(doctor);
  const [inputName, setInputName] = useState(name);
  const [inputNote, setInputNote] = useState(note);
  const [inputAnalyzeType, setInputAnalyzeType] = useState(analyzeType);
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
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
          }
          actions={[
            //TODO: по нажатию должно отправлять все стейты на сервак
            <Icon onClick={saveResult} type="save" key="save"/>,

            <Icon onClick={handleEdit(id)} type="rollback" key="rollback"/>,
          ]}>
      <Meta
        description={
          <>
            <Input onChange={handleInput(setInputName)} value={inputName}/>
            <DatePicker value={moment(inputDate)} onChange={time => setInputDate(time)}/>
            <Input onChange={handleInput(setInputDoctor)} value={inputDoctor}/>
            <Input onChange={handleInput(setInputAnalyzeType)} value={inputAnalyzeType}/>
            <TextArea onChange={handleInput(setInputNote)} value={inputNote}/>
          </>
        }/>
    </Card>
  )
}