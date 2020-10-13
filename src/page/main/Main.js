import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MainContent from './component/MainContent';
import CartContent from '../cart/component/CartContent';
import MainSider from '../component/MainSider';
import { Layout, Menu } from 'antd';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const Main = (props) => {
  const render = props.states.BookData.map((book) => {
    return (
      <>
        <p>{book.book_no}</p>
        <p>{book.book_name}</p>
      </>
    );
  });

  console.log(props.states.BookData);

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
              <MainContent data={props.states.BookData} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </>
  );
};

export default Main;
