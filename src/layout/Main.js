import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

function Main({ children }) {
  return <Content style={{ padding: '0 50px' }}>{children}</Content>;
}
export default Main;
