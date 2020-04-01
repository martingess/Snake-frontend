import jwt from 'jwt-decode'

export default function reducer(state = {
  data: null,
  status: null
}, action) {
  switch (action.type) {
    case ('redLogin.login'):
      return {
        ...state, data: action.payload, status: action.status
      };
    case ('redLogin.logout'):
      return {
        data: null, status: null
      };
    case ('redLogin.fetching'):
      return {
        ...state, status: action.status
      };
    default:
      return state;
  }
}

export const logout = () => ({
  type: 'redLogin.logout'
});

export function login(dispatch) {
  const fetchStart = () => ({
    type: 'redLogin.fetching',
    status: 'loading'
  });
  const fetchDone = (data) => ({
    type: 'redLogin.login',
    status: 'done',
    payload: data
  });
  const fetchError = () => ({
    type: 'redLogin.fetching',
    status: 'error'
  });

  return async (login, password) => {
    dispatch(fetchStart());
    const response = await fetch('http://localhost:3022/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `query lg{
          login(username: "${login}", password: "${password}")
        }`,
        variable: {},
      })
    });
    const user = await response.json()
    console.log('результаты феча', user);
    if (user && user.data && user.data.login) {
      const res = jwt(user.data.login);
      console.log('результаты jwt', res);

      return dispatch(fetchDone(res))
    }
    dispatch(dispatch(fetchError()))
  }
}