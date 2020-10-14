import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Layout, Button } from 'antd';
import MainSider from '../component/MainSider';
import MainDetailContent from './component/MainDetailContent';
const { Sider, Content } = Layout;
const MainDetail = (props) => {
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [Book, setBook] = useState([]);

  useEffect(() => {
    Axios.post('/main/detail', Data).then((res) => {
      if (res.data.success) {
        console.log('성공');
        console.log(res.data.row);
        setBook(res.data.row);
      } else {
        console.log('실패');
      }
    });
  }, []);

  console.log(Book.map((e) => e.book_no));
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
              <p>Book Number : {Book.map((e) => e.book_no)}</p>
              <br />
              <p>Book Name : {Book.map((e) => e.book_name)}</p>
              <br />
              <p>Book Price : {Book.map((e) => e.book_price)}</p>

              <Button>구매하기</Button>
              <Button onClick={props.callbacks.onAddCart}>장바구니 추가</Button>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default MainDetail;
