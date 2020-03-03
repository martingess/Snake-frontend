import React from "react";
import {Row, Card, Icon, Col,} from "antd";
import ResultCard from "./result/ResultCard";
import ResultCardEditable from "./result/ResultCardEditable";
import {connect} from "react-redux";


function Results({resultsData, nowEditing, dispatch}) {
  //TODO: узнать насколько это оптимально, сколько раз рендерится это несчастье и тянет ли ререндер других элементов
  return (
    <Row type="flex" gutter={[16, 32]}>
      {resultsData.map(dataItem => {
        if(nowEditing === dataItem.id){
          return <Col span={8}>
            <ResultCardEditable nowEditing dispatch={dispatch} key={dataItem.id} data={dataItem}/>
          </Col>
        }
        return (
          <Col span={8}>
            <ResultCardEditable key={dataItem.id} dispatch={dispatch} data={dataItem}/>
          </Col>
        )
      })}
    </Row>
  )
}

export default connect(state=>({nowEditing: state.results.nowEditing, resultsData: state.results.data}),
  (dispatch)=>({dispatch}))(Results)