import React from 'react';
import { Results } from './Results';
import { connect } from 'react-redux';
import {getPatientsResults} from '../modules/redDoctor.js' 
import {
    deleteResult,
    setIsEditing,
  } from '../modules/redResults';
import { Redirect } from 'react-router-dom';

const PatientsResultsPage = (p) => {
  const {isDoctor} = p;
    if (!isDoctor) return <Redirect to='/results'/>
    return <Results {...p} isNotOwner={true} />
}
export default connect(
    (state) => ({
      isLogin: state.login.status,
      isEditing: state.results.isEditing,
      resultsData: state.doctor.patientsResults,
      isDoctor: state.login.data && state.login.data.role === 'doctor'
    }),
    (dispatch) => ({ 
      setResults: () => getPatientsResults(dispatch),
      setEditing: (id) => dispatch(setIsEditing(id)),
      deleteRes: (id) => dispatch(deleteResult({ id })),
     }),
  )(PatientsResultsPage);