import React, { useState, useEffect } from 'react';
import '../Cart.css';
import { Table, Button, Popconfirm } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
const CartContent = ({ props }) => {
  let history = useHistory();
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    Axios.get('/cart').then((res) => {
      console.log(res.data.row);
      props.callbacks.setCart(res.data.row);
    });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    Axios.delete('/cart/' + id).then((res) => {
      if (res.data.success) {
        console.log('2');
      }
    });
  };
  const CartColumns = [
    {
      title: 'BookNo',
      dataIndex: 'book_book_no',
      key: 'book_book_no',
    },
    {
      title: 'BookName',
      dataIndex: 'book_name',
      key: 'book_name',
    },
    {
      title: 'BookCount',
      dataIndex: 'basket_book_count',
      key: 'basket_book_count',
    },
    {
      title: 'Created',
      dataIndex: 'basket_created',
      key: 'basket_created',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (e, record) => (
        <Popconfirm
          title="삭제하시겠습니까?"
          onConfirm={() => handleDelete(record.book_book_no)}
        >
          <a> Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(5); //개수
  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = props.states.cart.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(props.states.cart.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }
  ///////////////////////////////////////////////////////////////////////////

  const CartOrder = () => {
    history.push('/cart/order');
  };

  ////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div id="wrapper">
        <div id="customer_section">
          <Table
            columns={CartColumns}
            dataSource={datas}
            borderd
            pagination={false}
            onRow={(e) => ({
              onClick: () => {
                // history.push('/');
                console.log(
                  'key : ' + e.key
                  // 'UserId :' + e.UserId,
                  // 'name : ' + e.name
                );
              },
            })}
          />
          <div id="Btn-layout">
            {count.map((e) => (
              <Button key={e} onClick={() => setCurrentPage(e)}>
                {e}
              </Button>
            ))}
            <button onClick={CartOrder}>주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
