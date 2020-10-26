import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Layout, Button, InputNumber, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import MainSider from '../component/MainSider';
const { Sider, Content } = Layout;
const MainDetail = (props) => {
  let history = useHistory();
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [Book, setBook] = useState([]);
  const [count, setCount] = useState(1);
  const [info, setinfo] = useState('');

  const submit = () => {
    console.log(info);
  };

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
  const onChange = (value) => {
    console.log('changed', value);
    setCount(value);
  };
  const render = Book.map((e) => {
    return (
      <>
        <div>
          <ul key={e.book_no}>
            <li>Book Number : {e.book_no}</li>
            <br />
            <li>Book Name : {e.book_name}</li>
            <br />
            <li>Book Price : {e.book_price}</li>
            <br />
            <li>Book count : {e.book_count}</li>
            <br />
            수량:{' '}
            <InputNumber
              min={1}
              max={e.book_count}
              defaultValue={1}
              onChange={onChange}
            />
          </ul>
        </div>
      </>
    );
  });

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
              {render}
              <br />
              <br />
              <br />
              {props.states.Bool ? (
                <Button onClick={() => history.push(`/buy/${Data.BookNo}`)}>
                  구매하기
                </Button>
              ) : (
                ''
              )}
              {props.states.Bool ? (
                <Button
                  onClick={() => {
                    Axios.post('/cart', { Data, count: count }).then((res) => {
                      if (res.data.success) {
                        alert('장바구니 추가 완료');
                      } else {
                        alert('해당 상품이 장바구니에 이미 있습니다');
                      }
                    });
                  }}
                >
                  장바구니 추가
                </Button>
              ) : (
                '구매하려면 로그인 하세요'
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default MainDetail;
