import React from 'react';

const BuyContent = (props) => {
  return (
    <>
      {props.data}
      <br /> <br />
      {props.cardRender}
      {props.AddressRender}
      <br />
      <button>주문하기</button>
    </>
  );
};

export default BuyContent;
