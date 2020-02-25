import React from "react";
import {Row, Card, Icon, Col,} from "antd";
import ResultCard from "./result/ResultCard";


//TODO: захардкодил начальные данные
export default function Results() {
  const resultsData = [{name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
    {name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
    {name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
    {name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
    {name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
    {name: 'БАК-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},]
  return (
    <Row gutter={[16, 32]}>
      {resultsData.map(dataItem => {
        return (
          <Col span={8}>
            <ResultCard data={dataItem}/>
          </Col>
        )
      })}
    </Row>
  )
}