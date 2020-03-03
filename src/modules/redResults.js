import update from 'immutability-helper';

export default function reducer(state = { data: null, nowEditing: null }, action) {
    switch (action.type) {
      case('redResults.setData'):
        return {...state, data: action.payload};
      case('redResults.setNowEditing'):
        return {...state, nowEditing: action.payload};
      case('redResults.updateResult'):
        return {};
      default:
        return state;
    }
}

export const setResultsData = (payload) => ({type: 'redResults.setData', payload});
export const setNowEditing = (payload) => ({type: 'redResults.setNowEditing', payload})