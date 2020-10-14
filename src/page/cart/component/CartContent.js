import React, { useState, useEffect } from 'react';
import '../Cart.css';
import { Table, Button } from 'antd';
import { data } from '../CartData';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
const CartContent = () => {
  let history = useHistory();
  const CartColumns = [
    {
      title: 'UserId',
      dataIndex: 'UserId',
      key: 'UserId',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(5); //개수
  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = data.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(data.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }

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
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
