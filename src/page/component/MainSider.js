import React from 'react';
import { Menu  } from 'antd';
import {Link,useHistory} from 'react-router-dom'
const MainSider = () => {
    return (
        <div>
        <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
          <Menu.Item key="1"><Link to = "/">메인화면</Link></Menu.Item>
          <Menu.Item key="2"><Link to = "/cart">장바구니</Link></Menu.Item>
          <Menu.Item key="3"><Link to = "/mypage">마이페이지</Link></Menu.Item>
      </Menu>
        </div>
    );
};

export default MainSider;