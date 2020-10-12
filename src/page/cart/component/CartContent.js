import React, { useState } from 'react';
import '../Cart.css';
import { Table, Button } from 'antd';
import { data } from '../CartData';
import Axios from 'axios'
const CartContent = () => {
    const columns = [
        {
          title: 'UserId',
          dataIndex: 'UserId',
          key: 'UserId',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
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
                columns={columns}
                dataSource={datas}
                borderd
                pagination={false}
                onRow={(e) => ({
                  onClick: () =>
                    // console.log(
                    //   'key : ' + e.key,
                    //   'UserId :' + e.UserId,
                    //   'name : ' + e.name
                    // ),
                    Axios.get()
                    
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