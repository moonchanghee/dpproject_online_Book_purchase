import React, { useState, useEffect } from 'react';
import MainSider from '../component/MainSider';
import Axios from 'axios';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { Layout, InputNumber, List, Button, Radio, Input } from 'antd';
const { Sider, Content } = Layout;

const BuyPage = (props) => {
  let history = useHistory();
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [Book, setBook] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [SelectCard, setSelectCard] = useState([]);
  const [SelectAddress, setSelectAddress] = useState([]);
  const [price, setprice] = useState();

  useEffect(() => {
    Axios.post('/main/detail', Data).then((res) => {
      if (res.data.success) {
        console.log('성공');
        console.log(res.data.row);
        setBook(res.data.row);
        for (let i = 0; i < res.data.row.length; i++) {
          setprice(res.data.row[i].book_price);
        }
      } else {
        console.log('실패');
      }
    });
    Axios.get('/buy/card').then((res) => setUserCard(res.data.row));
    Axios.get('/buy/address').then((res) => setUserAddress(res.data.row));
  }, []);

  const onChange = (value) => {
    console.log('changed', value);
    props.callbacks.setCount(value);
  };

  const render1 = Book.map((e) => {
    return (
      <>
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
    console.log(SelectCard);
    console.log(SelectAddress);
    let body = [
      Data,
      SelectCard,
      SelectAddress,
      { order_price: price * props.states.count },
    ];
    let id;

    Axios.post('/buy/order', body)
      .then((res) => {
        if (res.data.success) {
          id = res.data.orderid;
        }
      })
      .then((e) =>
        Axios.post('/buy/orderdetail', [id, props.states.count, Data]).then(
          (res) => {
            if (res.data.success) {
              console.log('성공');
              alert('구매 완료');
              history.push(`/`);
            } else {
              alert('구매 실패');
              console.log('실패');
            }
          }
        )
      );
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
              합계 : {price * props.states.count}
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
export default BuyPage;
