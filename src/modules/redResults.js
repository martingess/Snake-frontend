import update from 'immutability-helper';
import api from '../helpers/api'

export default function reducer(state = {
  data: null,
  isEditing: null
}, action) {
  switch (action.type) {
    case ('redResults.setData'):
      return {
        ...state, data: action.payload, status: action.status
      };
    case ('redResults.setIsEditing'):
      return {
        ...state, isEditing: action.payload
      };
    case ('redResults.deleteResult'):
      let toDeleteArrayIndex;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.payload.id) {
          toDeleteArrayIndex = i;
          break;
        } else if (i === state.length - 1) {
          return state;
        }
      }
      return update(state, {
        data: {
          $splice: [
            [toDeleteArrayIndex, 1]
          ]
        }
      });
    default:
      return state;
  }
}

export const setResultsData = (dispatch) => {
  const fetchStart = () => ({
    type: 'redResults.setData',
    status: 'loading'
  });
  const fetchDone = (data) => ({
    type: 'redResults.setData',
    status: 'done',
    payload: data
  });
  const fetchError = () => ({
    type: 'redResults.setData',
    status: 'error'
  });

  return async () => {
    dispatch(fetchStart());
    const results = await api.getUserResults();
    if (results && results.data && results.data) {
      return dispatch(fetchDone(results.data.findUserResults))
    }
    dispatch(dispatch(fetchError()))
  }
}
export const setIsEditing = (payload) => ({
  type: 'redResults.setIsEditing',
  payload
});

export const deleteResult = (payload) => {
  api.deleteResultById(payload.id)
  return {
    type: 'redResults.deleteResult',
    payload
  }
};