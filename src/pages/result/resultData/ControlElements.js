import React, { useState } from "react";
import { Button, Popover } from "antd";
import api from "../../../helpers/api";
import notificationList from "../../../helpers/notification";
import { Redirect, useHistory } from "react-router-dom";
import SearchDoctor from "./controlElements/SearchDoctor";
import { connect } from "react-redux";
import { getPatientsResults } from "../../../modules/redDoctor";

function ControlElements({ setIsEditing, result, isDoctor, getResults }) {
  const history = useHistory();
  const [visibleDeletePopover, setVisibleDeletePopover] = useState(false);
  const handleDelete = async () => {
    api.deleteResultById(result.id);
    notificationList.resultDeleted();
    setRedirect(true);
  };
  const [redirect, setRedirect] = useState(false);
  const handleDoctorDeleteHimself = async () => {
    await api.doctorRejectResult(result.id);
    history.push('/patientsResults')
    getResults();
  };
  if (isDoctor) {
    return (
      <Popover
        content={
          <p>
            Удалить вас из этого результата, вы не будете больше иметь доступа к
            нему
          </p>
        }
      >
        <Button type="danger" onClick={handleDoctorDeleteHimself}>
          Удалить
        </Button>
      </Popover>
    );
  }
  return (
    <div>
      {redirect && <Redirect to={"/results"} />}

      <SearchDoctor />
      <Button
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Редактировать
      </Button>
      <Popover
        visible={visibleDeletePopover}
        trigger={"click"}
        onVisibleChange={(visible) => setVisibleDeletePopover(visible)}
        content={
          <div>
            <div>Вы точно хотите удалить этот результат?</div>
            <Button type="danger" onClick={handleDelete}>
              Я уверен, удалить.
            </Button>
            <Button>Не уверен.</Button>
          </div>
        }
      >
        <Button type="danger" onClick={() => setVisibleDeletePopover(true)}>
          Удалить
        </Button>
      </Popover>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getResults: getPatientsResults(dispatch),
});
export default connect(() => {}, mapDispatchToProps)(ControlElements);
