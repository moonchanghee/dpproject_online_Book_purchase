import React, { useEffect, useState } from 'react';
import MainSider from '../component/MainSider';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
const { Sider, Content } = Layout;

const BuySuccess = (props) => {
  let history = useHistory();
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    Axios.get('/buy/success/' + props.states.orderId).then((res) => {
      if (res.data.success) {
        console.log('성공');
        console.log(res.data.row);
        console.log(res.data.row[0].order_id);
        setOrderId(res.data.row[0].order_id);
      } else {
        console.log('실패');
      }
    });
  }, []);

  const onClick = () => {
    let body = [orderId, props.states.count, Data];
    Axios.post('/buy/orderdetail', body).then((res) => {
      if (res.data.success) {
        console.log('성공');
        history.push(`/main/${Data.BookNo}`);
      } else {
        console.log('실패');
      }
    });
  };
  return (
    <>
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
              <p>주문번호 : {orderId}</p>
              <p>주문개수: {props.states.count}</p>
              <button onClick={onClick}>OK</button>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default BuySuccess;
