import React, {useEffect} from "react";
import {Row, Col} from "antd";
import ResultCard from "./results/ResultCard";
import ResultCardEditable from "./results/ResultCardEditable";
import {connect} from "react-redux";
import {deleteResult, setIsEditing, setResultsData} from "../modules/redResults";

function Results({isLogin, resultsData, isEditing, dispatch}) {
  console.log(resultsData)
  useEffect(()=>{
    dispatch(setResultsData(dispatch))
  }, [isLogin])
  const handleEdit = (id) => (e) => {
    e.stopPropagation()
    if (id === isEditing) return dispatch(setIsEditing({}));
    dispatch(setIsEditing(id));
  };
  const handleDelete = (id) => (e) => {
    e.stopPropagation()
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