/* eslint-disable no-undef */
import React from "react";
import {Card, Icon} from "antd";
import {useHistory} from 'react-router-dom'
import moment from "moment";
import imgPlaceholder from '../../imgs/image-placeholder.jpg'

const {Meta} = Card;

export default function ResultCard({data, handleEdit, handleDelete}) {
const {id, name, date, doctorName, note} = data;
const history = useHistory();
console.log(process.env)
const mainImg = data.imgsPaths[0] ? process.env.REACT_APP_BACKEND_PATH + data.imgsPaths[0] : imgPlaceholder
return (
  <Card hoverable style={{width: 300}}
        cover={
          <img alt="example" src={mainImg} />
        }
        actions={[
          <Icon onClick={handleEdit(id)} type="edit" key="edit"/>,
          <Icon onClick={handleDelete(id)} type="delete" key="delete"/>,
        ]}
        onClick={()=> history.push(`/showResult:${id}`)}
  >
    <Meta title={name}
          description={
            <>
              <div>{moment(date).format('MMMM Do YYYY')}</div>
              <div>Doctor: {doctorName}</div>
              {note && <div>Notes: {note}</div>}
            </>
          }
    />
</Card>)}