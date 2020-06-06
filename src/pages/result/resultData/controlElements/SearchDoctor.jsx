import React, { useState, useContext } from "react";
import { Popover, Input, Button } from "antd";
import Search from "../../../../layout/header/Search";
import api from "../../../../helpers/api";
import { ResultContext } from "../../../Result";
import notificationList from "../../../../helpers/notification";
import { useDispatch } from "react-redux";
import { setResultsData } from "../../../../modules/redResults";

function SearchDoctor({ children }) {
  const [visibleAddDoctorPopover, setVisibleAddDoctorPopover] = useState(false);
  const result = useContext(ResultContext);

  const handleSearch = (setSearchResult, setIsVisible) => async (value) => {
    console.log(value)
    let searchResultFetch = await api.searchDoctors(value);

    if (searchResultFetch.data && searchResultFetch.data.searchDoctors) {
      const arrayOfDoctors = searchResultFetch.data.searchDoctors.filter(
        (item) =>{
         return !(~result.notConfirmedDoctors.findIndex(doctorObj=>doctorObj.id === item.id) ||
         ~result.doctors.findIndex(doctorObj=>doctorObj.id === item.id)  )
        }
      );
      setSearchResult(arrayOfDoctors);
    } else setSearchResult([]);
    setIsVisible(true);
  };

  const dispatch = useDispatch();
  const handleAddDoctor = (doctorId) => async () => {
    const res = await api.updateResult({
      shareWithDoctor: doctorId,
      id: result.id,
    });
    dispatch(setResultsData(dispatch));
  };
  return (
    <Popover
      visible={visibleAddDoctorPopover}
      onVisibleChange={(visible) => setVisibleAddDoctorPopover(visible)}
      trigger={"click"}
      content={
        <Search
          handleAddDoctor={handleAddDoctor}
          handleSearch={handleSearch}
          searchDoctor={true}
        />
      }
    >
      <Button>Поделится с врачом</Button>
    </Popover>
  );
}

export default SearchDoctor;
