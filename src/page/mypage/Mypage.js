import React, { useState, useEffect } from 'react';
import MainSider from '../component/MainSider';
import MypageContent from './component/MypageContent';
import Axios from 'axios';
import { Layout, Menu } from 'antd';
const { Sider, Content } = Layout;

const Mypage = (props) => {
  return (
    <div>
      <Layout theme="light">
        <Layout>
          <Sider width={200} className="site-layout-background">
            <MainSider />
            {props.states.username}
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
              {props.states.Bool ? (
                <MypageContent />
              ) : (
                '마이 페이지 조회 하려면 로그인하세요'
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </div>
  );
};

export default Mypage;
