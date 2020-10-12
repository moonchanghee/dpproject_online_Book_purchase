import React from 'react';
import MainSider from '../component/MainSider'
import CartContent from './component/CartContent'
import { Layout, Menu  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const CartMain = (props) => {
    return (
        <div>
    <Layout theme = "light">

    <Layout>
      <Sider className="site-layout-background">
      <MainSider/>
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
        {props.states.Bool ?<CartContent/> : "장바구니 조회하려면 로그인하세요" }
        {/**{props.states.username}
        <CartContent/>**/}
        </Content>
      </Layout>
    </Layout>
  </Layout>,
        </div>
    );
};

export default CartMain;