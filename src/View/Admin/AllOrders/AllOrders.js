import React, {useEffect, useState} from "react";
import {Card, Spin, Table, Tag, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders} from "../../../Store/Actions/Admin";
const { Title } = Typography;

const AllOrders = () => {
    const dispatch = useDispatch()
    const {all_orders,loading} = useSelector(state => state.adminReducer);
    const [loader,setLoader] = useState(false);
    const [orderState,setOrderState] = useState([]);
    const columns = [
        {
            title: 'Order Date',
            dataIndex: 'OrderDate',
            key: 'OrderDate',

        },
        {
            title: 'Vendor',
            dataIndex: 'VendorId',
            key: 'VendorId',
        },
        {
            title: 'User',
            dataIndex: 'UserID',
            key: 'UserID',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: data => {
                let color
                 color = data === 'complete' ? 'green' : data === "new" ? "gold" : "blue"

                return (<>
                    <Tag color={color}>
                        {data.toUpperCase()}
                    </Tag>
                </>)
            }
        },
        {
            title: 'Devlivery Address',
            dataIndex: 'DevliveryAddress',
            key: 'DevliveryAddress',
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
    useEffect(() => {
        dispatch(getAllOrders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(all_orders) {
            setOrderState(all_orders.map(changes => {
                return changes.doc.data();
            }));
        }
    },[all_orders])

    useEffect(() => {
        setLoader(loading);
    },[loading])
    return(
        <div>
            <Card style={{marginBottom:"20px", height:"75px"}}>
                <Title level={4} style={{float:"left"}}>All Orders</Title>
            </Card>
            {loader ? <Spin size="large" /> : <Table columns={columns} dataSource={orderState} />}
    </div>
    )
}

export default AllOrders
