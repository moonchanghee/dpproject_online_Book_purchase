import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MainContent from './component/MainContent';
import MainSider from '../component/MainSider';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const Main = (props) => {
  // const { book, setBook } = useState([{}]);
  useEffect(() => {
    Axios.get('/main/book').then((res) => {
      console.log(res.data.row);
    });
  }, []);
  return (
    <>
      <Layout theme="light">
        <Layout>
          <Sider width={200} className="site-layout-background">
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
              {props.states.username}
              <MainContent />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </>
  );
};

export default Main;
