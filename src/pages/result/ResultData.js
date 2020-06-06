import React from 'react'
import getDate from "../../helpers/getDate";
import api from "../../helpers/api";
import ListOfDoctors from "./resultData/ListOfDoctors";
import { setResultsData } from "../../modules/redResults";
import ControlElements from './resultData/ControlElements';
import { connect } from 'react-redux';
function DataComponent(p) {
  const { setIsEditing, isDoctor, setResults } = p;
  const handleCancel = (id) => {
    return async () => {
      await api.removeDoctorFromResult(p.result.id, id);
      setResults();
    };
  }
  return (
    <div>
      <h2>Название: {p.result.name}</h2>
      {p.result.doctorName ? <p>Врач: {p.result.doctorName}</p> : null}
      {p.result.date ? <p>Дата: {getDate(p.result.date)}</p> : null}
      {p.result.note && <p>Заметки: {p.result.note}</p>}
      {p.result.doctors && p.result.doctors[0] && (
        <>
          <p>Врачи имеющие доступ:</p>
          <ListOfDoctors
            data={p.result.doctors}
            handelCancel={handleCancel}
          />
        </>
      )}
      {p.result.notConfirmedDoctors && p.result.notConfirmedDoctors[0] && (
        <>
          <p>Врачи, которым был отправлен запрос:</p>
          <ListOfDoctors data={p.result.notConfirmedDoctors} handelCancel={handleCancel} />
        </>
      )}
      {<ControlElements setIsEditing={setIsEditing} isDoctor={isDoctor} result={p.result}/>}

    </div>
  );
}

const ConnectedResultData = connect((state)=>({
  isDoctor: state.login.data && state.login.data.role === 'doctor'
}), (dispatch)=>({
  setResults: setResultsData(dispatch)
}))(DataComponent)
export default ConnectedResultData
