import React, {useEffect , useState} from 'react';
import Axios from 'axios';
import TrueSession from '../component/TrueSession'
import FalseSession from '../component/FalseSession'
import MainSider from '../component/MainSider'
import { Layout, Menu  } from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const Main = (props) => {

  
  return (
    <>

    <Layout theme = "light">
   
    <Layout>
      <Sider width={200} className="site-layout-background">
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
        {props.states.username}
        메인페이지입니다
        </Content>
      </Layout>
    </Layout>
  </Layout>,

      </>
  )
};

export default Main;