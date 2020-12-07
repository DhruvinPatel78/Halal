import React, {useEffect, useState} from "react";
import {Card,Typography,Table,Spin,Select,Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getOrderByVendor,updateOrderStatus} from "../../Store/Actions/Orders";

const {Title} = Typography
const { Option } = Select;
const VendorOrders = () => {
    const [orderByVendor, setOrderByVendor] = useState(undefined);
    const [orderId, setOrderId] = useState([]);
    const dispatch = useDispatch();
    const {vendorOrder,loading} = useSelector(state => state.ordersReducer)
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        dispatch(getOrderByVendor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
       if(vendorOrder){
           setOrderByVendor(vendorOrder.map(changes => {
               return changes.doc.data();
           }))
           setOrderId(vendorOrder.map(changes => {
               return changes.doc.id;
           }))
       }
    },[vendorOrder])
    useEffect(() => {
        setLoader(loading);
    },[loading])

    const columns = [
        {
            title: 'User Email',
            dataIndex: 'UserID',
            key: 'UserID',
        },
        {
            title: 'Lamb',
            dataIndex: 'Lamb',
            key: 'Lamb',
            render:(lamb) => {
                return +lamb !== 0 ? lamb : "-"
            }
        },
        {
            title: 'Cow',
            dataIndex: 'Cow',
            key: 'Cow',
            render:(cow) => {
                return +cow !== 0 ? cow : "-"
            }
        },
        {
            title: 'Goat',
            dataIndex: 'Goat',
            key: 'Goat',
            render:(goat) => {
                return +goat!== 0 ? goat : "-"
            }
        },
        {
            title: 'Cow Share',
            dataIndex: 'CowShare',
            key: 'CowShare',
            render:(cowShare) => {
                return +cowShare !== 0 ? cowShare : "-"
            }

        },
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
            render:(status) => {
                let color
                color = status === 'complete' ? 'green' : status === "process" ? "gold" : "blue"
                return <Tag color={color}>{status.toUpperCase()}</Tag>
            }
        },
        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'Total',
        },
        {
            title: 'Action',
            render:(data,_,index) => {
                console.log(data.Status)
                return (
                    <>
                        { data.Status !== 'complete' ? <Select defaultValue="select" style={{ width: 140 }} onChange={(value) =>
                            onChangeStatus(value,orderId[index],data.Lamb,data.Cow,data.Goat,data.CowShare)
                        }>
                            <Option value="select" disabled>Change Status</Option>
                            {data.Status === 'pending' ? <Option value="process" >Process</Option> :
                            <Option value="complete" >Complete</Option>}
                        </Select> : "Order Completed" }
                    </>
                )
            }
        },



    ];

    const onChangeStatus = (value,index,lamb,cow,goat,cowShare) => {
        dispatch(updateOrderStatus(value,index,lamb,cow,goat,cowShare))
    }

    return(<div>
        <Card style={{marginBottom:"70px", height:"75px"}}>
            <Title level={4} style={{float:"left"}}>Your orders</Title>
        </Card>
        { loader ? <Spin size={"large"}/> : <Table columns={columns} dataSource={orderByVendor} />}
    </div>);
}

export default VendorOrders
