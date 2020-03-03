import React, {useState} from "react";
import {Card, Icon, Input, DatePicker, Form} from "antd";
import {setNowEditing} from "../../modules/redResults";
import moment from "moment";
const {TextArea} = Input;
const {Meta} = Card;

export default function ResultCardEditable({data = {}, dispatch, nowEditing}) {
  const {id, name, date, doctor, note} = data;
  //states
  const [inputDate, setInputDate] = useState(date);
  const [inputDoctor, setInputDoctor] = useState(doctor);
  const [inputName, setInputName] = useState(name);
  const [inputNote, setInputNote] = useState(note);
  //handlers
  const handleEdit = (id) => () => {
    if (nowEditing) return dispatch(setNowEditing({}));
    dispatch(setNowEditing(id))
  };
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
            <Icon onClick={()=>{}} type="save" key="save"/>,
            <Icon onClick={handleEdit()} type="rollback" key="rollback"/>,
          ]}>
      <Meta
        description={
          <>
            <Input onChange={handleInput(setInputName)} value={inputName}/>
            <DatePicker value={moment(inputDate)} onChange={time=>setInputDate(time)}/>
            <Input onChange={handleInput(setInputDoctor)} value={inputDoctor}/>
            <TextArea onChange={handleInput(setInputNote)} value={inputNote}/>
          </>
        }/>
    </Card>
  )
}