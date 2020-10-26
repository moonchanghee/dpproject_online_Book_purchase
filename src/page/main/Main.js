import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MainContent from './component/MainContent';
import CartContent from '../cart/component/CartContent';
import MainSider from '../component/MainSider';
import { Layout, Menu, Input } from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const Main = (props) => {
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
              <MainContent
                data={props.states.BookData}
                info={props.states.info}
                onChangeInfo={props.callbacks.onChangeInfo}
                submit={props.callbacks.submit}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
