import React, { useEffect, useState } from 'react';
import MainSider from '../component/MainSider';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const { Sider, Content } = Layout;

const CartSuccess = (props) => {
  let history = useHistory();
  //   const BookNo = props.match.params.BookNo;
  //   const Data = { BookNo: BookNo };
  //bookno

  const [orderId, setOrderId] = useState();

  //   useEffect(() => {
  // console.log(props.states.CartOrderId.length);
  // for (let i = 0; i <= props.states.CartOrderId.length; i++) {
  //   console.log(props.states.CartOrderId[i]);
  //   Axios.get('/buy/success/' + props.states.CartOrderId[i]).then((res) => {
  //     if (res.data.success) {
  //       console.log('성공');
  //       console.log(res.data.row);
  //       console.log(res.data.row.order_id);
  //       setOrderId(res.data.row.order_id);
  //     } else {
  //       console.log('실패');
  //     }
  //   });
  // }
  //     props.states.CartOrderId.map(e => {
  //         Axios.get('/buy/success/' + props.states.e).then((res) => {
  //                 if (res.data.success) {
  //                   console.log('성공');
  //                   console.log(res.data.row);
  //                   console.log(res.data.row.order_id);
  //                   setOrderId(res.data.row.order_id);
  //                 } else {
  //                   console.log('실패');
  //                 }
  //               });
  //     })
  //   }, []);

  const onClick = () => {
    for (let i = 0; i < props.states.CartOrderId.length; i++) {
      let body = [
        props.states.CartOrderId[i],
        props.states.cart[i].basket_book_count,
        { BookNo: props.states.cart[i].book_book_no },
      ];
      Axios.post('/buy/orderdetail', body).then((res) => {
        if (res.data.success) {
          console.log('성공');
          history.push(`/`);
        } else {
          console.log('실패');
        }
      });
    }
  };

  const render = props.states.cart.map((e) => {
    return (
      <>
        <p>책번호: {e.book_book_no}</p>
        <p>주문개수: {e.basket_book_count}</p>
        <br />
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

              <button onClick={onClick}>OK</button>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CartSuccess;
