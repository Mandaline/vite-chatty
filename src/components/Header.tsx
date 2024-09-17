import { Menu } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { WechatOutlined, EditOutlined } from '@ant-design/icons';

const Header = () => {
  const location = useLocation(); 
  const [current, setCurrent] = useState(location.pathname === '/products' ? 'r' : 'h');

  const onClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark" >
        <Menu.Item key="h" icon= {<WechatOutlined />}>
          <Link to="/">Chat</Link>
        </Menu.Item>
        <Menu.Item key="r" icon= {<EditOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>
  )
};
export default Header;