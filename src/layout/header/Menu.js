import React from 'react';
import { Menu as MenuAnt } from 'antd';
import { Link } from 'react-router-dom';

export default function Menu(p) {

  return (
    <MenuAnt mode={'horizontal'}>
      {p.isDoctor ? (
        <MenuAnt.Item>
          <Link to="/patientsResults">Patient Results</Link>
        </MenuAnt.Item>
      ) : (
        <MenuAnt.Item>
          <Link to={'/'}>Results</Link>
        </MenuAnt.Item>
      )}
      <MenuAnt.Item>
        <Link to={'/about'}>About us</Link>
      </MenuAnt.Item>
    </MenuAnt>
  );
}
