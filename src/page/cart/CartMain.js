import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MainSider from '../component/MainSider';
import CartContent from './component/CartContent';
import { Layout, Menu } from 'antd';
import ErrorList from 'antd/lib/form/ErrorList';
const { Header, Footer, Sider, Content } = Layout;

const CartMain = (props) => {
  // const [cartData, setCartData] = useState([]);
  // const cartData = [];

  // const [cartData, setCartData] = useState({
  //   key: '',
  //   UserId: '',
  // });

  // useEffect(() => {
  //   Axios.get('/cart').then((res) => {
  //     if (res.data.success) {
  //       console.log(res.data.data);
  //       // setCartData(cartData.concat(res.data.data));
  //       // cartData.push(res.data.data);
  //       console.log(cartData);
  //     } else {
  //       alert('Failed');
  //     }
  //   });
  // }, []);

  return (
    <div>
      <Layout theme="light">
        <Layout>
          <Sider className="site-layout-background">
            <MainSider />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {props.states.Bool ? (
                <CartContent />
              ) : (
                '장바구니 조회하려면 로그인하세요'
              )}
              {/**{props.states.username}
        <CartContent/>**/}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </div>
  );
};

export default CartMain;
