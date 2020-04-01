import update from 'immutability-helper';

export default function reducer(state = {data: null, isEditing: null}, action) {
  switch (action.type) {
    case('redResults.setData'):
      return {...state, data: action.payload};
    case('redResults.setIsEditing'):
      return {...state, isEditing: action.payload};
    case('redResults.deleteResult'):
      let toDeleteArrayIndex;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.payload.id) {
          toDeleteArrayIndex = i;
          break;
        } else if (i === state.length-1){
          return state;
        }
      }
      return update(state, {data: {$splice: [[toDeleteArrayIndex, 1]]}});
    default:
      return state;
  }
}

export const setResultsData = (payload) => ({type: 'redResults.setData', payload});
export const setIsEditing = (payload) => ({type: 'redResults.setIsEditing', payload});

//TODO: добавить удаление результата на сервере
export const deleteResult = (payload) => ({type: 'redResults.deleteResult', payload});