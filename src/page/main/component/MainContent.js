import React, { useState, useEffect } from 'react';
import '../../cart/Cart.css';
import { Table, Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
const MainContent = (props) => {
  let history = useHistory();
  let MainColums = [
    {
      title: 'book_no',
      dataIndex: 'book_no',
      key: 'book_no',
    },
    {
      title: 'bookName',
      dataIndex: 'book_name',
      key: 'book_name',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(5); //개수
  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = props.data.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(props.data.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }

  return (
    <>
      <div id="wrapper">
        <div id="customer_section">
          <Input.Group style={{ width: '25%' }}>
            <Input.Search
              enterButton
              placeholder="name"
              allowClear
              onChange={props.onChangeInfo}
              onSearch={props.submit}
              size="middle"
              value={props.info}
            />
          </Input.Group>
          <Table
            columns={MainColums}
            dataSource={datas}
            borderd
            pagination={false}
            onRow={(e) => ({
              onClick: () => {
                history.push(`/main/${e.book_no}`);
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

export default MainContent;
