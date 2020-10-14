import React, { useState } from 'react';
import Axios from 'axios';
import { Table, Button } from 'antd';

const CardContent = () => {
  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];
  const [CardNo, setCardNo] = useState();
  const [CardName, setCardName] = useState();
  const [CardValidity, setCardValidity] = useState();

  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(5); //개수
  const [AddressNo, setAddressNo] = useState();
  const [AddressBasic, setAddressBasic] = useState('');
  const [AddressDetail, setAddressDetail] = useState('');
  const onChangeCardNo = (e) => {
    setCardNo(e.currentTarget.value);
  };
  const onChangeCardName = (e) => {
    setCardName(e.currentTarget.value);
  };
  const onChangeCardValidity = (e) => {
    setCardValidity(e.currentTarget.value);
  };

  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = data.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(data.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="cardNo"
          value={CardNo}
          onChange={onChangeCardNo}
        ></input>
        <input
          type="text"
          placeholder="cardName"
          value={CardName}
          onChange={onChangeCardName}
        ></input>
        <input
          type="text"
          placeholder="cardValidity"
          value={CardValidity}
          onChange={onChangeCardValidity}
        ></input>
        <button>카드 저장하기</button>
        <br />
        <br />
        <br />
      </form>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.address_detail}</p>
          ),
          rowExpandable: (record) => record.address_no !== 'Not Expandable',
        }}
        dataSource={datas}
      />
      {count.map((e) => (
        <Button
          style={{ marginLeft: '45%', marginTop: '5%' }}
          key={e}
          onClick={() => setCurrentPage(e)}
        >
          {e}
        </Button>
      ))}
    </>
  );
};

export default CardContent;
