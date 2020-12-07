import React, {useState} from 'react';
import './App.css';
import {Switch, Link, useHistory, Redirect} from "react-router-dom";
import Login from "./View/Login/Login";
import Register from "./View/Registration/Registration";
import PrivateRoute from "./Routing/PrivateRoute";
import PublicRoute from "./Routing/PublicRoute";
import Home from "./View/Home/Home";
import { Layout, Menu } from 'antd';
import UserProfile from "./View/UserProfile/UserProfile";
import Orders from "./View/Orders/Orders";
import OrderHistory from "./View/OrderHistory/OrderHistory";
import ContactUs from "./View/ContactUs/ContactUs";
import UserList from "./View/Admin/Users/Users";
import halalLogo from './Common/image/title_logo.png'
import {
    UserOutlined,
    PlusCircleOutlined,
    HistoryOutlined,
    ContactsOutlined,
    LogoutOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    BarChartOutlined,
    UnorderedListOutlined,
    StockOutlined
} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {logout} from "./Store/Actions/Authentication";
import AllOrders from "./View/Admin/AllOrders/AllOrders";
import VendorOrders from "./View/Vendor/VendorOrder";
import VendorStock from "./View/Vendor/VendorStock";
const { Header, Content, Sider } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch();
    const type = localStorage.getItem('type')
    const history = useHistory();
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const signout = () => {
        dispatch(logout((response) => {
                localStorage.setItem('token','');
            localStorage.setItem('email','');
            localStorage.setItem('type','');
            // eslint-disable-next-line no-restricted-globals
            history.push('/login')
        }))
    }


  return (
    <div className="App" >

        <Switch>
            <PublicRoute  restricted={true} exact path="/login" Component={Login}/>
            <PublicRoute  restricted={true} exact path="/register" Component={Register}/>


            <Layout style={{ minHeight: '100vh' }} >

                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse} className="sider">
                    <Header style={{backgroundColor:"#364f2a"}} className="customHeader">
                        <h1 > <Link to="/"><img
                            width={168}
                            height={50}
                            src={halalLogo}
                            alt={"logo"}
                        /></Link>
                        </h1>
                    </Header>
                    <Menu theme="light"  mode="inline">
                        { type === 'user' &&  <Menu theme="light"  mode="inline">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PlusCircleOutlined />}>
                            <Link to="/new-order">New Order</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HistoryOutlined />}>
                            <Link to="/order-history">Order History</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ContactsOutlined />}>
                            <Link to="/contact-us">Contact Us</Link>
                        </Menu.Item></Menu> } {type === 'vendor' && <Menu theme="light"  mode="inline">
                        <Menu.Item key="8" icon={<UserOutlined />}>
                            <Link to="/vendor/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<BarChartOutlined />}>
                            <Link to="/vendor/orders">Your Orders</Link>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<StockOutlined />}>
                            <Link to="/vendor/stock">Your Stock</Link>
                        </Menu.Item>

                        </Menu> } {type === 'admin' && <Menu theme="light"  mode="inline">
                        <Menu.Item key="9" icon={<UsergroupAddOutlined />}>
                            <Link to="/admin/users">All Users</Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<UnorderedListOutlined />}>
                            <Link to="/admin/all-orders">All Orders</Link>
                        </Menu.Item>
                        <Menu.Item key="11" icon={<UserAddOutlined />}>
                            <Link to="/admin/profile">Admin Profile</Link>
                        </Menu.Item>
                    </Menu>
                       }
                        <Menu.Item key="12" icon={<LogoutOutlined/>} onClick={signout} >
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="customHeader" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }} >

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            { type === 'user' ?
                                <>
                                <Redirect to={'/'}/>
                                <PrivateRoute exact path="/" Component={Home}/>
                                <PrivateRoute exact path="/profile" Component={UserProfile}/>
                                <PrivateRoute exact path="/new-order" Component={Orders}/>
                                <PrivateRoute exact path="/order-history" Component={OrderHistory}/>
                                <PrivateRoute exact path="/contact-us" Component={ContactUs}/>
                                </>
                                : type === "vendor" ?
                                <>
                                <Redirect to={'/vendor/profile'}/>
                                <PrivateRoute exact path="/vendor/orders" Component={VendorOrders}/>
                                <PrivateRoute exact path="/vendor/profile" Component={UserProfile}/>
                                <PrivateRoute exact path="/vendor/stock" Component={VendorStock}/></>
                                : type === "admin" ? <>
                                <Redirect to={'/admin/users'}/>
                                <PrivateRoute exact path="/admin/users" Component={UserList}/>
                                <PrivateRoute exact path="/admin/profile" Component={UserProfile}/>
                                <PrivateRoute exact path="/admin/all-orders" Component={AllOrders}/>
                                </>
                                : <Redirect to={'/login'}/>
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Switch>
    </div>
  );
}

export default App;
