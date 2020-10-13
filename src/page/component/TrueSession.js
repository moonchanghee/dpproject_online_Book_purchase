import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
const TrueSession = (props) => {
  return (
    <div>
      <p style={{ color: '#FFFFFF' }}>
        {' '}
        {props.states.username}님 환영합니다
        <Button onClick={props.callbacks.LogoutOnClick}>
          <Link to="/">로그아웃</Link>
        </Button>
      </p>
    </div>
  );
};

export default TrueSession;
