import update from 'immutability-helper';
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
    const response = await fetch('http://localhost:3022/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken
      },
      body: JSON.stringify({
        query: `query FindUserResults{
          findUserResults(username:"My"){
            name,
            analyzeType,
            id,
            date,
            imgsPaths,
            doctorName,
            note
          }
        }`,
        variable: {},
      })
    });
    const results = await response.json()
    console.log('результаты феча', results);
    if (results && results.data && results.data) {
      console.log('результаты jwt', results);
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
  console.log(payload.id)
  fetch('http://localhost:3022/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + localStorage.authToken
    },
    body: JSON.stringify({
      query: `mutation deleteResult{
   deleteResult(id:"${payload.id}")
   }
 `,
  variable: {}
    })
  })
  return {
    type: 'redResults.deleteResult',
    payload
  }
};