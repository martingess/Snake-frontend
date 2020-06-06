import jwt from 'jwt-decode'
import api from '../helpers/api'
import { useHistory } from 'react-router-dom';

export default function reducer(state = {
  data: null,
  status: "anonymous"
}, action) {
  switch (action.type) {
    case ('redLogin.login'):
      return {
        ...state, data: action.payload, status: action.status
      };
    case ('redLogin.logout'):
      return {
        data: null, status: "anonymous"
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
  localStorage.removeItem('authToken', '');
  return {
    type: 'redLogin.logout'
  };
}

export const softLogin = (jwtToken) => ({
  type: 'redLogin.login',
  payload: {...jwt(jwtToken), jwt: jwtToken},
  status: 'done'
})

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

  return async (login, password, remember) => {
    dispatch(fetchStart());
    
    const user = await api.login(login, password)
    //TODO: добавить ремембер в этот иф
    if (user && remember) {
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