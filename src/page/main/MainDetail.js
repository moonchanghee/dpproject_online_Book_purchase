import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const MainDetail = (props) => {
  const BookNo = props.match.params.BookNo;
  const Data = { BookNo: BookNo };
  const [Book, setBook] = useState([]);

  useEffect(() => {
    Axios.post('/main/detail', Data).then((res) => {
      if (res.data.success) {
        console.log('성공');
        console.log(res.data.row);
        setBook(res.data.row);
      } else {
        console.log('실패');
      }
    });
  }, []);

  console.log(Book.map((e) => e.book_no));
  return <div>{Book.map((e) => e.book_no)}</div>;
};

export default MainDetail;
