import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientsResults } from '../modules/redDoctor';
const { Content } = Layout;

function Main({ children }) {
  const role = useSelector(state=>state.login.data && state.login.data.role)
  const dispatch = useDispatch();
  useEffect(() => {
    getPatientsResults(dispatch)();
  }, [role, dispatch])

  return <Content style={{ padding: '0 50px' }}>{children}</Content>;
}
export default Main;
