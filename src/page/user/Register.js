import React, { useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import Axios from 'axios';
const Register = (props) => {

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
        onSubmit={props.callbacks.onSubmitregister}
      >
      <input type="text" placeholder="name" value={props.states.Name} onChange={props.callbacks.onChangeName} />
        <input type="text" placeholder="id" value={props.states.Id} onChange={props.callbacks.onIdHandler} />
        <input
          type="text"
          placeholder="pw"
          value={props.states.Pwd}
          onChange={props.callbacks.onPwdChange}
        />
        <input
          type="text"
          placeholder="email"
          value={props.states.Email}
          onChange={props.callbacks.onEmailChange}
        />
        <button onSubmit={props.callbacks.onSubmitregister}>회원가입</button>
      </form>
    </div>
  );
};
export default Register;
