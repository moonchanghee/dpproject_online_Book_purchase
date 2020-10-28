import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Register from './page/user/Register';
import MainPage from './page/main/Main';
import Card from './page/mypage/Card';
import Login from './page/user/Login';
import Cart from './page/cart/CartMain';
import Mypage from './page/mypage/Mypage';
import TrueSession from './page/component/TrueSession';
import FalseSession from './page/component/FalseSession';
import MainDetail from './page/main/MainDetail';
import PropTypes from 'prop-types';
import Buypage from './page/buy/BuyPage';
import CartOrder from './page/cart/CartOrder';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header } = Layout;

const App = ({ states, callbacks }) => {
  return (
    <>
      <BrowserRouter>
        <Header className="header">
          {states.Bool ? (
            <TrueSession states={states} callbacks={callbacks} />
          ) : (
            <FalseSession states={states} callbacks={callbacks} />
          )}
        </Header>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <MainPage {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/user/register"
            render={(props) => (
              <Register {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/user/login"
            render={(props) => (
              <Login {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/cart"
            render={(props) => (
              <Cart {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/mypage"
            render={(props) => (
              <Mypage {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/mypage/card"
            render={(props) => (
              <Card {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/main/:BookNo"
            render={(props) => (
              <MainDetail {...props} states={states} callbacks={callbacks} />
            )}
          />
          <Route
            exact
            path="/buy/:BookNo"
            render={(props) => (
              <Buypage {...props} states={states} callbacks={callbacks} />
            )}
          />

          <Route
            exact
            path="/cart/order"
            render={(props) => (
              <CartOrder {...props} states={states} callbacks={callbacks} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};
App.propTypes = {
  states: PropTypes.object.isRequired,
  callbacks: PropTypes.object.isRequired,
};
export default App;
