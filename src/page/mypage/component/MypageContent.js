import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm } from 'antd';
//주소
//상세주소
const MypageContent = () => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    Axios.get('/mypage/address').then((res) => {
      console.log(res.data.row);
      setAddress(res.data.row);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1); //시작
  const [postPerPage] = useState(3); //개수
  const [AddressNo, setAddressNo] = useState();
  const [AddressBasic, setAddressBasic] = useState('');
  const [AddressDetail, setAddressDetail] = useState('');

  const onChangeAddressNo = (e) => {
    setAddressNo(e.currentTarget.value);
  };
  const onChangeAddressBasic = (e) => {
    setAddressBasic(e.currentTarget.value);
  };
  const onChangeAddressDetail = (e) => {
    setAddressDetail(e.currentTarget.value);
  };

  const columns = [
    { title: 'AddressNo', dataIndex: 'address_no', key: 'address_no' },
    { title: 'AddressBasic', dataIndex: 'address_basic', key: 'address_basic' },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      render: (e, record) => (
        <Popconfirm
          title="삭제하시겠습니까?"
          onConfirm={() => handleDelete(record.address_no)}
        >
          <a> Delete</a>
        </Popconfirm>
      ),
    },
  ];

  let indexOfLastPost = currentPage * postPerPage; //페이지에 마지막 데이터 인덱스/3
  let indexOfFirstPost = indexOfLastPost - postPerPage; //페이지 첫번째 데이터 인덱스/0
  let datas = address.slice(indexOfFirstPost, indexOfLastPost); //  1*5 last = 5 ,,, first = 0/0,3/
  let count = []; //  2*5 last = 10 ,,, first = 5
  let total = Math.ceil(address.length / postPerPage); //버튼count

  for (let i = 1; i <= total; i++) {
    count.push(i);
  }
  let body = {
    address_no: AddressNo,
    address_basic: AddressBasic,
    address_detail: AddressDetail,
  };

  const onSubmit = () => {
    Axios.post('/mypage/address', body).then((res) => {
      console.log(res.data.success);
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    Axios.delete('/mypage/address/' + id).then((res) => {
      if (res.data.success) {
        console.log('2');
      }
    });
  };
  const [a, seta] = useState();

  // const onChangeAddress = () => {
  //   Axios.post('/mypage/address/up', body).then((res) => {
  //     console.log(res.data.success);
  //   });
  // };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="addressNo"
          value={AddressNo}
          onChange={onChangeAddressNo}
        ></input>
        <input
          type="text"
          placeholder="addressBasic"
          value={AddressBasic}
          onChange={onChangeAddressBasic}
        ></input>
        <input
          type="text"
          placeholder="addressDetail"
          value={AddressDetail}
          onChange={onChangeAddressDetail}
        ></input>
        <button>주소 저장하기</button>
      </form>
      {/**<button onClick={onChangeAddress}>주소 수정하기</button>*/}
      <br />
      <Table
        columns={columns}
        pagination={false}
        onRow={(e) => ({
          onClick: () => {
            seta(e.address_no);
          },
        })}
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
    </div>
  );
};

export default MypageContent;
