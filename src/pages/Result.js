import React from "react";
import {Row, Col} from "antd";
import ResultCard from "./result/ResultCard";
import ResultCardEditable from "./result/ResultCardEditable";
import {connect} from "react-redux";
import {deleteResult, setIsEditing} from "../modules/redResults";


function Results({resultsData, isEditing, dispatch}) {
  const handleEdit = (id) => () => {
    if (id === isEditing) return dispatch(setIsEditing({}));
    dispatch(setIsEditing(id));
  };
  const handleDelete = (id) => () => {
    dispatch(deleteResult({id}))
  };
  return (
    <Row type="flex" gutter={[16, 32]}>
      {resultsData.map(dataItem => {
        if (isEditing === dataItem.id) {
          return <Col key={dataItem.id}
                      span={8}>
            <ResultCardEditable handleEdit={handleEdit}
                                isEditing={isEditing}
                                dispatch={dispatch}
                                data={dataItem}/>
          </Col>
        }
        return (
          <Col key={dataItem.id} span={8}>
            <ResultCard handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        dispatch={dispatch}
                        data={dataItem}/>
          </Col>
        )
      })}
    </Row>
  )
}

export default connect(state => ({isEditing: state.results.isEditing, resultsData: state.results.data}),
  (dispatch) => ({dispatch}))(Results)