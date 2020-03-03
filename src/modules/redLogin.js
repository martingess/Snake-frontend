import jwt from 'jwt-decode'

export default function reducer(state = {data: null, status: null}, action) {
  switch (action.type) {
    case('redLogin.login'):
      return {...state, data: action.payload, status: action.status};
    case('redLogin.logout'):
      return {data: null, status: null};
    case('redLogin.fetching'):
      return {...state, status: action.status};
    default:
      return state;
  }
}

export const logout = () => (
  {type: 'redLogin.logout'}
)

export function login(dispatch) {
  const fetchStart = () => ({type: 'redLogin.fetching', status: 'loading'});
  const fetchDone = (data) => ({type: 'redLogin.login', status: 'done', payload: data});
  const fetchError = () => ({type: 'redLogin.fetching', status: 'error'});

  return (login, password) => {
    dispatch(fetchStart());
    fetch('http://shop-roles.asmer.fs.a-level.com.ua/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `query lg{
          login(login: "${login}", password: "${password}")
        }`,
        variable: {},
      })
    }).then(r => r.json())
      .then(r => {
          console.log('результаты феча', r, !!r.data.login);
          if (r && r.data && r.data.login) {
            const res = jwt(r.data.login);
            return dispatch(fetchDone(res))
          }
        }
      )
      .catch(e =>
        dispatch(dispatch(fetchError())))
  }
}
