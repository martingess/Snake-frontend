import React from 'react';
import { Results } from './Results';
import { connect } from 'react-redux';
import {getPatientsResults} from '../modules/redDoctor.js' 
import {
    deleteResult,
    setIsEditing,
    setResultsData,
  } from '../modules/redResults';

const PatientsResultsPage = (p) => {
    return <Results {...p} isNotOwner={true} />
}
export default connect(
    (state) => ({
      isLogin: state.login.status,
      isEditing: state.results.isEditing,
      resultsData: state.doctor.patientsResults,
    }),
    (dispatch) => ({ 
      setResults: () => getPatientsResults(dispatch)(),
      setEditing: (id) => dispatch(setIsEditing(id)),
      deleteRes: (id) => dispatch(deleteResult({ id })),
     }),
  )(PatientsResultsPage);