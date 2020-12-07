import React, {useEffect, useState} from "react";
import {Table, Spin, Card, Typography, Tabs, Tag} from "antd";
import "../Home/Home.css"
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHistory} from "../../Store/Actions/Orders";
const { TabPane } = Tabs;
const { Title } = Typography;

const OrderHistory = () => {
    const dispatch = useDispatch()
    const {orderHistory,loading} = useSelector(state => state.ordersReducer);
    const [orderState,setOrderState] = useState([]);
    const [tabActive,setTabActive] = useState("all");
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        if(orderHistory.length) {
            setOrderState(orderHistory.map(changes => {
                return changes.doc.data();
            }));
        }
    },[orderHistory])

    useEffect(() => {
        setLoader(loading);
    },[loading])

    useEffect(() => {
        dispatch(getOrdersHistory())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tabActive])

    const columns = [
        {
            title: 'Order Date',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render:(date) => {
                return date.toDate().toString().substr(0,15)
            }
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: data => {
                let color
                color = data === 'complete' ? 'green' : data === "process" ? "gold" : "blue"

                return (<>
                    <Tag color={color}>
                        {data.toUpperCase()}
                    </Tag>
                </>)
            }
        },

        {
            title: 'Goat',
            dataIndex: 'Goat',
            key: 'Goat',
        },
        {
            title: 'Lamb',
            dataIndex: 'Lamb',
            key: 'Lamb',
        },
        {
            title: 'Cow',
            dataIndex: 'Cow',
            key: 'Cow',
        },
        {
            title: 'Cow Share',
            dataIndex: 'CowShare',
            key: 'CowShare',
        },

        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'Total',
        },

    ];


    return(<div>
        <Card style={{marginBottom:"20px", height:"75px"}}>
            <Title level={4} style={{float:"left"}}>Order History</Title>
        </Card>
        <Tabs defaultActiveKey={tabActive}  onChange={(key) => setTabActive(key)}>
            <TabPane tab="All Order" key="all" >
                { loader ? <Spin size="large" /> : <Table columns={columns} dataSource={orderState} /> }
            </TabPane>
            <TabPane tab="Order In Process" key="process" >
                { loader ? <Spin size="large" /> : <Table columns={columns} dataSource={orderState.filter(data => data.Status === "process")} /> }
            </TabPane>
            <TabPane tab="Pending Order" key="pending">
                { loader ? <Spin size="large" /> : <Table columns={columns} dataSource={orderState.filter(data => data.Status === "pending")} /> }
            </TabPane>
            <TabPane tab="Completed Order" key="complete">
                { loader ? <Spin size="large" /> : <Table columns={columns} dataSource={orderState.filter(data => data.Status === "complete")} /> }
            </TabPane>
        </Tabs>

    </div>)
}

export default OrderHistory
