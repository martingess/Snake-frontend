import React, {useEffect} from "react";
import {Row, Col} from "antd";
import ResultCard from "./result/ResultCard";
import ResultCardEditable from "./result/ResultCardEditable";
import {connect} from "react-redux";
import {deleteResult, setIsEditing, setResultsData} from "../modules/redResults";

function Results({isLogin, resultsData, isEditing, dispatch}) {
  console.log(resultsData)
  useEffect(()=>{
    dispatch(setResultsData(dispatch))
  }, [isLogin])
  const handleEdit = (id) => () => {
    if (id === isEditing) return dispatch(setIsEditing({}));
    dispatch(setIsEditing(id));
  };
  const handleDelete = (id) => () => {
    dispatch(deleteResult({id}))
  };
  return (
    <Row type="flex" gutter={[16, 32]}>
      {resultsData && resultsData.map(dataItem => {
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

export default connect(state => ({isLogin: state.login.status, isEditing: state.results.isEditing, resultsData: state.results.data}),
  (dispatch) => ({dispatch}))(Results)