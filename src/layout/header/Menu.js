import React from 'react';
import { Menu as MenuAnt } from 'antd';
import { Link } from 'react-router-dom';

export default function Menu({className, isDoctor}) {
  return (
    <MenuAnt mode={'horizontal'}>
      {isDoctor ? (
        <MenuAnt.Item>
          <Link to="/patientsResults">Patient Results</Link>
        </MenuAnt.Item>
      ) : (
        <MenuAnt.Item>
          <Link to={'/results'}>Results</Link>
        </MenuAnt.Item>
      )}
      <MenuAnt.Item>
        <Link to={'/about'}>About us</Link>
      </MenuAnt.Item>
    </MenuAnt>
  );
}
