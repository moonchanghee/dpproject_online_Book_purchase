import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

const Login = (props) => {
  let history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={props.callbacks.onSubmitlogin}
      >
        <input
          type="text"
          placeholder="id"
          value={props.states.id}
          onChange={props.callbacks.onIdChange}
        />
        <input
          type="password"
          placeholder="pw"
          value={props.states.Password}
          onChange={props.callbacks.onPasswordHandler}
        />
        <button
          onClick={() => {
            props.states.Bool ? history.push('/') : history.push('/user/login');
          }}
        >
          로그인
        </button>
        <Link to="/user/register">회원가입</Link>
      </form>
    </div>
  );
};

export default Login;
