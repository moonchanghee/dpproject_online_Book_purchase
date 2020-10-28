import React from 'react';
import MainContent from './component/MainContent';
import MainSider from '../component/MainSider';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
const { Sider, Content } = Layout;

const Main = (props) => {
  return (
    <>
      <Layout theme="light">
        <Layout>
          <Sider style={{ height: '800px' }} className="site-layout-background">
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
