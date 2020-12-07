import React, {useEffect, useState} from "react";
import {Card, Spin, Table, Tabs, Typography, Tag, Button, Form, Input, message, Tooltip} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers,addVendor,addInitialStockDetails} from "../../../Store/Actions/Admin";
import CustomDrawer from "../../../Component/Drawer/Drawer";
import {registration} from "../../../Store/Actions/Authentication";
import {SyncOutlined} from "@ant-design/icons/lib";

const {Title} = Typography
const {TabPane} = Tabs;


const UserList = () => {

    const [loader, setLoader] = useState(false);
    const [userList, setUserList] = useState([]);
    const [vendorEmail, setVendorEmail] = useState("");
    const [vendorPassword, setVendorPassword] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [storeName, setStoreName] = useState("");
    const [paypal, setPayPal] = useState("");
    const [phone, setPhone] = useState("");
    const [stockType, setStockType] = useState("");

    const [tabActive, setTabActive] = useState("users");
    const dispatch = useDispatch();
    const [drawer, setDrawer] = useState(false);
    const {all_users, loading} = useSelector(state => state.adminReducer)

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = () => {
        dispatch(getAllUsers());
    }

    useEffect(() => {
        if (all_users) {
            setUserList(all_users.map(user => {
                return user.doc.data();
            }))
        }
    }, [all_users])

    useEffect(() => {
        setLoader(loading)
    }, [loading]);

    const vendorsColumn = [
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Store Name',
            dataIndex: 'StoreName',
            key: 'StoreName',
        },
        {
            title: 'Store Status',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: data => {
                const status = data ? 'Active' : 'InActive';
                const color = data ? 'green' : 'geekblue';
                return (<>
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                </>)
            }

        },
        {
            title: 'Stock Type',
            dataIndex: 'StockType',
            key: 'StockType',
            render: data => {
                return (<>
                    <Tag color='#966a4a'>
                        {data.toUpperCase()}
                    </Tag>
                </>)
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'PhoneNumber',
            key: 'PhoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },

    ];
    const userColumn = [
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'User Status',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: data => {
                const status = data ? 'Active' : 'InActive';
                const color = data ? 'green' : 'geekblue';
                return (<>
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                </>)
            }

        },

        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
    ];

    const addVendors = () => {
        dispatch(registration(vendorEmail, vendorPassword, (response => {
            message.success("Vendor is Created")
            setDrawer(false)
            dispatch(addVendor({
                email: vendorEmail,
                name,
                storeName,
                paypal,
                address,
                stockType,
                phone
            },(res) => {
                dispatch(addInitialStockDetails(vendorEmail))
                setVendorEmail('');
                setVendorPassword('');
                setName('');
                setStoreName('');
                setStockType('');
                setAddress('');
                setPhone('');
                setPayPal('');
            }))
        })))
    }

    return (
        <div>
            <Card style={{marginBottom: "20px", height: "75px"}}>
                <Title level={4} style={{float: "left"}}>All Users</Title>
                <Button type="primary" style={{float: "right"}} onClick={() => {
                    setDrawer(true)

                }}>Add Vendor</Button>
                <Tooltip title="Refresh" color="#364f2a">
                    <Button type="default" style={{float: "right",marginRight:"20px"}} onClick={getUsers}>
                        <SyncOutlined/> Refresh
                    </Button>
                </Tooltip>
            </Card>

            <Tabs defaultActiveKey={tabActive} onChange={(key) => setTabActive(key)}>
                <TabPane tab="Users" key="user">
                    {loader ? <Spin size="large"/> :
                        <Table columns={userColumn} dataSource={userList.filter(data => data.Type === "user")}/>}
                </TabPane>
                <TabPane tab="Vendor" key="vendor">
                    {loader ? <Spin size="large"/> :
                        <Table columns={vendorsColumn} dataSource={userList.filter(data => data.Type === "vendor")}/>}
                </TabPane>
            </Tabs>
            <CustomDrawer visible={drawer} onClose={() => setDrawer(false)} title="Add New vendor">
                <Form layout="vertical" onFinish={addVendors}>
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input type={"text"} placeholder="Enter Name" size="large" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Store Name"
                        name="StoreName"
                        rules={[{ required: true, message: 'Please input your store Name!' }]}
                    >
                        <Input type={"text"} placeholder="Enter Store Name" size="large" value={storeName}
                               onChange={(e) => setStoreName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input type={"text"} placeholder="Enter email" size="large" value={vendorEmail}
                               onChange={(e) => setVendorEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter password" size="large" value={vendorPassword}
                                        onChange={(e) => setVendorPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Paypal Client Id"
                        name="paypal"
                        rules={[{ required: true, message: 'Please input your Paypal client id!' }]}
                    >
                        <Input type={"text"} placeholder="Enter Paypal Client Id" size="large" value={paypal}
                               onChange={(e) => setPayPal(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Stock Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your stock type!' }]}
                    >
                        <Input type={"text"} placeholder="Enter  Stock Type" size="large" value={stockType}
                               onChange={(e) => setStockType(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input type={"text"} placeholder="Enter Address" size="large" value={address}
                               onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input type={"text"} placeholder="Enter  Phone Number" size="large" value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >Add Vendor</Button>
                    </Form.Item>
                </Form>
            </CustomDrawer>
        </div>
    )
}

export default UserList;
