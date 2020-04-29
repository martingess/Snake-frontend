import jwt from 'jwt-decode'
import api from '../helpers/api'

export default function reducer(state = {
  data: null,
  status: "anomymous"
}, action) {
  switch (action.type) {
    case ('redLogin.login'):
      return {
        ...state, data: action.payload, status: action.status
      };
    case ('redLogin.logout'):
      return {
        data: null, status: "anomymous"
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
    const user = await api.login(login, password)
    if (remember && user) {
      localStorage.setItem("authToken", user.data.login)
    }
    if (user && user.data && user.data.login) {
      try {
        const res = jwt(user.data.login);
        dispatch(fetchDone({...res, jwt: user.data.login}))
        return true
      } catch (err) {
        localStorage.removeItem('authToken')
        dispatch(fetchError())
        return false
      }
    }
    dispatch(fetchError())
    return false
  }
}