import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import ResultCard from './results/ResultCard';
import ResultCardEditable from './results/ResultCardEditable';
import { connect } from 'react-redux';
import {
  deleteResult,
  setIsEditing,
  setResultsData,
} from '../modules/redResults';

export function Results({ setResults, isLogin, resultsData, isEditing, dispatch, setEditing, deleteRes,  isNotOwner = false}) {
  useEffect(() => {
    setResults()
  }, [isLogin]);
  const handleEdit = (id) => (e) => {
    e.stopPropagation();
    if (id === isEditing) return setEditing(id);
    setEditing(id);
  };
  const handleDelete = (id) => (e) => {
    e.stopPropagation();
    deleteRes(id);
  };
  return (
    <Row type="flex" justify="space-around" gutter={[16, 32]}>
      {resultsData ?
        resultsData.map((dataItem) => {
          if (isEditing === dataItem.id) {
            return (
              <Col key={dataItem.id} span={4}>
                <ResultCardEditable
                  card
                  handleEdit={handleEdit}
                  isEditing={isEditing}
                  dispatch={dispatch}
                  data={dataItem}
                />
              </Col>
            );
          }
          return (
            <Col
              key={dataItem.id}
              xs={24}
              md={12}
              lg={10}
              xl={8}
              xxl={6}>
              <ResultCard
                isNotOwner={isNotOwner}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                dispatch={dispatch}
                data={dataItem}
              />
            </Col>
          );
        }) : <div>Результатов пока нет</div>}
    </Row>
  );
}

export default connect(
  (state) => ({
    isLogin: state.login.status,
    isEditing: state.results.isEditing,
    resultsData: state.results.data,
  }),
  (dispatch) => ({ 
    setResults: () => dispatch(setResultsData(dispatch)),
    setEditing: (id) => dispatch(setIsEditing(id)),
    deleteRes: (id) => dispatch(deleteResult({ id })),
   }),
)(Results);
