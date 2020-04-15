export default function reducer(
  state = {
    forApprove: [],
    status: null,
  },
  action,
) {
  switch (action.type) {
    case 'redDoctor.setApprove':
      return {
        status: 'done',
        forApprove: action.payload,
      };
    case 'redDoctor.clear':
        return {
            status: null,
            forApprove: []
        }
    case 'redDoctor.fetching':
      return {
        status: 'fetching',
        data: null,
      };
    default:
      return state;
  }
}

export const clearApproveResults = () => ({type: 'redDoctor.clear'})

export const getItemsForApprove = (dispatch) => {
  const fetching = () => ({ type: 'redDoctor.fetching' });
  const setApprove = (payload) => ({type: 'redDoctor.setApprove', payload })
  return async () => {
    dispatch(fetching());
    //TODO: переместить в api
    const response = await fetch('http://localhost:3022/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.authToken,
      },
      body: JSON.stringify({
        query: `query FindConfirm{
            resultsForApprove{
              id,
              name,
              user {
                name
              }
            }
          }`,
      }),
    });
    const results = await response.json();
    dispatch(setApprove(results.data.resultsForApprove))
  };
};
