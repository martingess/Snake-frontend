/* eslint-disable no-undef */
import React, { useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./Result.css";
import ResultCardEditable from "../components/ResultCardEditable";
import Carousel from "./result/resultData/Сarousel";
import DataComponent from "./result/ResultData";

export const ResultContext = React.createContext();

function Result(p) {
  const store = useSelector(state=>state);
  let result;

  const [isEditing, setIsEditing] = useState(false);
  if (store.results.data) {
    result = store.results.data.find(
      (result) => result.id === p.match.params.id.substr(1)
    );
  }
  if (store.doctor.patientsResults && !result) {
    result = store.doctor.patientsResults.find(
      (result) => result.id === p.match.params.id.substr(1)
    );
  }

  if (store.login.status !== "done" || !result) {
    return <div>Access denied</div>;
  }
  if (!result) {
    return <Spin size="large" />;
  }
  return (
    <ResultContext.Provider value={result}>
      <Row type={"flex"} align={"middle"}>
        <Col lg={12} xs={24}>
          <Carousel result={result} />
        </Col>
        <Col lg={10} xs={24} offset={2}>
          {isEditing ? (
            <ResultCardEditable data={result} setIsEditing={setIsEditing} />
          ) : (
            <DataComponent setIsEditing={setIsEditing} result={result} />
          )}
        </Col>
      </Row>
    </ResultContext.Provider>
  );
}

export default Result;
