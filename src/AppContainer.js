import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import App from './App';
import Axios from 'axios';

const AppContainer = (props) => {
  const [orderId, setOrderId] = useState();
  // const [CartorderId, setCartOrderId] = useState([]);
  let CartOrderId = [];
  const [count, setCount] = useState(1);
  const [BookData, setBookData] = useState([]);
  //////////////////////////////onSubmitregister///////
  const [info, setinfo] = useState('');

  const onChangeInfo = (e) => {
    setinfo(e.currentTarget.value);
  };

  const submit = () => {
    Axios.post('/main/', { data: info }).then((res) =>
      setBookData(res.data.row)
    );
    setinfo('');
  };

  //////////////////////////////////////
  useEffect(() => {
    Axios.get('/main/book').then((res) => {
      console.log(res.data.row);
      setBookData(res.data.row);
    });
  }, []);

  useEffect(() => {
    Axios.get('/user/login').then((res) => {
      if (res.data.success) {
        setBool(true);
        setUsername(res.data.sess);
        console.log(res.data.sess);
      } else {
        setBool(false);
      }
    });
  }, []);

  //세션 판별 요소
  const [Bool, setBool] = useState(false);

  //회원가임
  let history = useHistory();
  const [Name, setName] = useState('');
  const [Id, setId] = useState('');
  const [Pwd, setPwd] = useState('');
  const [Email, setEmail] = useState('');

  //로그인
  const [id, setid] = useState('');
  const [Password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };

  //로그인
  const onIdChange = (e) => {
    setid(e.currentTarget.value);
  };
  const onPwdChange = (e) => {
    setPwd(e.currentTarget.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  //로그아웃

  const LogoutOnClick = () => {
    Axios.get('/user/logout').then((res) => setBool(false), setUsername(null));
  };

  //회원가입
  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitlogin = (e) => {
    e.preventDefault(); //페이지 refresh를 막아준다

    console.log('id :' + id);
    console.log('Password : ' + Password);

    let body = {
      id: id,
      password: Password,
    };
    Axios.post('/user/login', body).then((res) => {
      if (res.data.success) {
        console.log('dd : ' + res.data.sess);
        setUsername(res.data.sess);
        setBool(true);

        // history.goBack()
        // props.history.goback()
      } else {
        console.log('no');
      }
    });

    // Axios.post('/users/login' , body).then(res => console.log(res.data.success))
  };

  //
  const onSubmitregister = (e) => {
    e.preventDefault(); //페이지 refresh를 막아준다
    console.log('id :' + Id);
    console.log('Password : ' + Pwd);

    let bodys = {
      id: Id,
      pwd: Pwd,
      name: Name,
    };

    Axios.post('/user/register', bodys).then((res) => {
      if (res.data.success) {
        alert(res.data.msg);
        // history.push('/');
      } else {
        alert(res.data.msg);
      }
    });
  };
  ///////// 장바구니 onclick////////

  const onAddCart = () => {
    console.log('장바구니 추가');
  };
  /////////////////////////////////

  const [cart, setCart] = useState([]);
  const callbacks = {
    onIdChange,
    onPwdChange,
    onEmailChange,
    onIdHandler,
    onPasswordHandler,
    onSubmitlogin,
    onSubmitregister,
    setBool,
    LogoutOnClick,
    onChangeName,
    onAddCart,
    onChangeInfo,
    submit,
    setOrderId,
    setCount,
    setCart,
  };
  const states = {
    Name,
    id,
    Id,
    Pwd,
    Email,
    Password,
    username,
    Bool,
    BookData,
    info,
    orderId,
    count,
    cart,
    CartOrderId,
  };

  return <App callbacks={callbacks} states={states} />;
};

export default AppContainer;
