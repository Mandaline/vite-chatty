import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { WechatOutlined, EditOutlined } from '@ant-design/icons';

const Header = () => {
  const [current, setCurrent] = useState('h');
  const onClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
     <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark" >
      <Menu.Item key="h" icon= {<WechatOutlined />}>
       <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="r" icon= {<EditOutlined />}>
        <Link to="/products">Products</Link>
      </Menu.Item>
     </Menu>
     <Outlet/>
    </>
   
  )
};
export default Header;