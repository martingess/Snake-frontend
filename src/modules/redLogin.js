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
        data: null, status: "logout"
      };
    case ('redLogin.fetching'):
      return {
        ...state, status: action.status
      };
    default:
      return state;
  }
}

export const logout = () => {
  localStorage.removeItem('authToken', '')
  return {
    type: 'redLogin.logout'
  };
}

export const softLogin = () => ({
  type: 'redLogin.login',
  payload: jwt(localStorage.getItem("authToken")),
  status: 'done'
})

export function login(dispatch) {
  console.log('Работает')
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

  return async (login, password, remember) => {
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
    const user = await response.json();

    //Remember user
    if (remember) {
      localStorage.setItem("authToken", user.data.login)
    }

    if (user && user.data && user.data.login) {
      try {
        const res = jwt(user.data.login);
        return dispatch(fetchDone(res))
      } catch (err) {
        localStorage.removeItem('authToken')
        return dispatch(dispatch(fetchError()))
      }
    }
  }
}