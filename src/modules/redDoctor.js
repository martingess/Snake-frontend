import api from "../helpers/api";

export default function reducer(
  state = {
    forApprove: [],
    patientsResults: [],
    status: null,
  },
  action,
) {
  switch (action.type) {
    case 'redDoctor.setPatientsResults': {
      return {
        ...state,
        patientsResultsDataStatus: 'done',
        patientsResults: action.payload,
      };
    }
    case 'redDoctor.setApprove': {
      return {
        ...state,
        approveDataStatus: 'done',
        forApprove: action.payload ? action.payload : [],
      };
    }
    case 'redDoctor.clear': {
      return {
        ...state,
        status: null,
        forApprove: [],
      };
    }
    case 'redDoctor.fetchingForApprove': {
      return {
        ...state,
        approveDataStatus: 'fetching',
      };
    }
    case 'redDoctor.fetchingForPatientsResults': {
      return {
        ...state,
        patientsResultsDataStatus: 'fetching',
      };
    }
    default:
      return state;
  }
}



//TODO: заглушка, нужно сделать так, чтобы все резалты обнулялись
export const clearApproveResults = () => ({
  type: 'redDoctor.clear',
});

export const getPatientsResults = (dispatch) => {
  const fetching = () => ({ type: 'redDoctor.fetchingForPatientsResults' });
  const setResults = (payload) => ({type: 'redDoctor.setPatientsResults', payload})
  return async () => {
    dispatch(fetching)
    const results = await api.getPatientsResults()
    dispatch(setResults(results && results.data && results.data.findDoctorResults))
  }
}

export const getItemsForApprove = (dispatch) => {
  const fetching = () => ({ type: 'redDoctor.fetchingForApprove' });
  const setApprove = (payload) => ({
    type: 'redDoctor.setApprove',
    payload,
  });
  return async () => {
    dispatch(fetching());
    const results = await api.getItemsForApprove()
    dispatch(setApprove(results && results.data && results.data.resultsForApprove));
  };
};
