import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Layout, Button, InputNumber, List } from 'antd';
import { useHistory } from 'react-router-dom';
import MainSider from '../component/MainSider';
const { Sider, Content } = Layout;
const MainDetail = (props) => {
  let history = useHistory();
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [Book, setBook] = useState([]);
  const [count, setCount] = useState(1);
  ///
  const [review, setReview] = useState('');
  const [redata, setredata] = useState();
  //
  const data = [{ id: 1, content: 'ddddddd' }];

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
    // Axios.get('/main/rev').then((res) => {
    //   setredata(res.data.row);
    // });
  }, []);
  const onChange = (value) => {
    console.log('changed', value);
    setCount(value);
  };
  /////////////////////////////////////////////////////////////

  // const Review = () => {
  //   Axios.post('/main/rev', { review: review }).then((res) => {
  //     if (res.data.success) {
  //       alert('등록완료');
  //     } else {
  //       alert('등록실패');
  //     }
  //   });
  // };

  // const onChangeReview = (e) => {
  //   setReview(e.currentTarget.value);
  // };
  // console.log(redata);
  ////////////////////////////////////////////////////////////
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
          <Sider className="site-layout-background" style={{ height: '800px' }}>
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
              {/************** 
                        <List
                itemLayout="horizontal"
                dataSource={redata}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={'id :' + item.member_member_no}
                      description={'coment :' + item.coment}
                    />
                  </List.Item>
                )}
                />**/}

              {/**<input
                type="text"
                value={review}
                onChange={onChangeReview}
              ></input>
              <button onClick={Review}>등록</button>**/}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default MainDetail;
