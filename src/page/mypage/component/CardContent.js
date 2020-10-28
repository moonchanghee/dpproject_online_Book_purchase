import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Table, Button, Popconfirm } from 'antd';

const CardContent = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    Axios.get('/mypage/card').then((res) => {
      setCard(res.data.row);
    });
  }, []);

  const [CardNo, setCardNo] = useState();
  const [CardName, setCardName] = useState();
  const [CardValidity, setCardValidity] = useState();
  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(5); //개수
  const onChangeCardNo = (e) => {
    setCardNo(e.currentTarget.value);
  };
  const onChangeCardName = (e) => {
    setCardName(e.currentTarget.value);
  };
  const onChangeCardValidity = (e) => {
    setCardValidity(e.currentTarget.value);
  };

  const onSubmit = () => {
    Axios.post('/mypage/card', body).then((res) => {
      console.log(res.data.success);
    });
  };
  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = card.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(card.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }

  const handleDelete = (id) => {
    console.log(id);
    Axios.delete('/mypage/card/' + id).then((res) => {
      if (res.data.success) {
        console.log('2');
      }
    });
  };

  const columns = [
    { title: 'CardName', dataIndex: 'card_name', key: 'card_name' },
    { title: 'CardValidity', dataIndex: 'card_validity', key: 'card_validity' },
    { title: 'CardNumber', dataIndex: 'card_no', key: 'card_no' },
    {
      title: 'Action',
      dataIndex: 'card_no',
      key: 'card_no',
      render: (e, record) => (
        <Popconfirm
          title="삭제하시겠습니까?"
          onConfirm={() => handleDelete(record.card_no)}
        >
          <a> Delete</a>
        </Popconfirm>
      ),
    },
  ];

  let body = {
    card_no: CardNo,
    card_name: CardName,
    card_validity: CardValidity,
  };

  return (
    <>
      <form onSubmit={onSubmit}>
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
        <input
          type="text"
          placeholder="cardNo"
          value={CardNo}
          onChange={onChangeCardNo}
        ></input>
        <button>카드 저장하기</button>
        <br />
        <br />
        <br />
      </form>
      <Table columns={columns} pagination={false} dataSource={datas} />
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
