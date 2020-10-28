import React, { useState, useEffect } from 'react';
import MainSider from '../component/MainSider';
import Axios from 'axios';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { Layout, InputNumber, List, Button, Radio, Input } from 'antd';
const { Sider, Content } = Layout;

const CartOrder = (props) => {
  let history = useHistory();
  const [Book, setBook] = useState([]);
  // const [count, setCount] = useState(1);
  const [userCard, setUserCard] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [buy, setBuy] = useState('');
  const [SelectCard, setSelectCard] = useState([]);
  const [SelectAddress, setSelectAddress] = useState([]);
  const [price, setprice] = useState();
  const [orderid, setOrderId] = useState();
  let totalPrice = 0;
  useEffect(() => {
    Axios.get('/buy/card').then((res) => setUserCard(res.data.row));
    Axios.get('/buy/address').then((res) => setUserAddress(res.data.row));
  }, []);

  const render1 = props.states.cart.map((e) => {
    {
      totalPrice += e.book_price * e.basket_book_count;
    }
    return (
      <>
        <br />
        <ul key={e.book_no}>
          <li>Book Number : {e.book_no}</li>
          <br />
          <li>Book Name : {e.book_name}</li>
          <br />
          <li>Book Price : {e.book_price}</li>
          <br />
          <li>order count : {e.basket_book_count}</li>
        </ul>
        합계 : {e.book_price * e.basket_book_count}
        <br />
      </>
    );
  });
  const CardOnChange = (e) => {
    setSelectCard(e.target.value);
  };

  const AddressOnChange = (e) => {
    setSelectAddress(e.target.value);
  };

  const OrderClick = () => {
    console.log(props.states.cart.length);
    console.log(props.states.cart);
    let body = [
      1,
      SelectCard,
      SelectAddress,
      {
        order_price: totalPrice,
      },
    ];
    let id;
    Axios.post('/buy/order', body)
      .then((res) => {
        if (res.data.success) {
          // props.states.CartOrderId.push(res.data.orderid);
          id = res.data.orderid;
        }
      })
      .then((e) => {
        for (let i = 0; i < props.states.cart.length; i++) {
          let body = [
            id,
            props.states.cart[i].basket_book_count,
            { BookNo: props.states.cart[i].book_book_no },
          ];
          Axios.post('/buy/orderdetail', body).then((res) => {
            if (res.data.success) {
              Axios.delete('/cart/' + props.states.cart[i].book_book_no);
              if (i + 1 == props.states.cart.length) {
                alert('구매 완료');
                history.push(`/`);
              }
            } else if (i + 1 == props.states.cart.length) {
              alert('구매 실패');
              console.log('실패');
            }
          });
        }
      });
  };

  return (
    <div>
      {' '}
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
              {render1}
              <br />
              <br />
              총합 : {totalPrice}
              <br />
              <br />
              <br />
              <Radio.Group onChange={CardOnChange}>
                {userCard.map((e) => {
                  return (
                    <Radio style={radioStyle} value={e}>
                      카드 번호 :{e.card_no} 카드 이름 : {e.card_name} 카드 유효
                      기간 : {e.card_validity}
                    </Radio>
                  );
                })}
              </Radio.Group>
              <br />
              <br />
              <br />
              <Radio.Group onChange={AddressOnChange}>
                {userAddress.map((e) => {
                  return (
                    <Radio style={radioStyle} value={e}>
                      주소 번호 : {e.address_no} 기본주소 : {e.address_basic}{' '}
                      상세 주소 : {e.address_detail}
                    </Radio>
                  );
                })}
              </Radio.Group>
              <button onClick={OrderClick}>주문하기</button>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
const radioStyle = {
  display: 'block',
  lineHeight: '30px',
  fontSize: '13px',
};
const style = {
  DivStyle: { marginTop: '5%', marginBottom: '10%' },
  ListStyle: {
    width: 400,
    height: 500,
    backgroundColor: '#ffffff',
  },
};
export default CartOrder;
