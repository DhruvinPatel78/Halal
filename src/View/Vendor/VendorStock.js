import React, {useEffect, useState} from "react";
import {Card,Typography,Table,Spin,Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getStockByVendor} from "../../Store/Actions/Orders";
import CustomDrawer from "../../Component/Drawer/Drawer";
import EditStock from "./EditStock";
const {Title} = Typography

const VendorStock = (props) => {
    const [stockByVendor, setStockByVendor] = useState([]);
    const dispatch = useDispatch();
    const {vendorStock,loading} = useSelector(state => state.ordersReducer)
    const [loader,setLoader] = useState(false);
    const [drawer, setDrawer] = useState(false);

    console.log("orderOFvendors",stockByVendor);
    useEffect(() => {
        dispatch(getStockByVendor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        if(vendorStock){
            setStockByVendor(vendorStock.map(changes => {
                return changes.doc.data();
            }))
        }
    },[vendorStock])
    useEffect(() => {
        setLoader(loading);
    },[loading])

    const columns = [
        {
            title: 'Lamb',
            dataIndex: 'Lamb',
            key: 'Lamb',
        },
        {
            title: 'Lamb Cost',
            dataIndex: 'LambCost',
            key: 'LambCost',
        },
        {
            title: 'Cow',
            dataIndex: 'Cow',
            key: 'Cow',
        },
        {
            title: 'Cow Cost',
            dataIndex: 'CowCost',
            key: 'CowCost',
        },
        {
            title: 'Goat',
            dataIndex: 'Goat',
            key: 'Goat',
        },
        {
            title: 'Goat Cost',
            dataIndex: 'GoatCost',
            key: 'GoatCost',
        },
        {
            title: 'Goat Share',
            dataIndex: 'GoatShare',
            key: 'GoatShare',
        },
        {
            title: 'Goat Share Cost',
            dataIndex: 'GoatShareCost',
            key: 'GoatShareCost',
        },

    ];

    return(<div>
        <Card style={{marginBottom:"70px", height:"75px"}}>
            <Title level={4} style={{float:"left"}}>Your orders</Title>
            <Button type={"primary"} style={{float:"right"}} onClick={() => setDrawer(true)}>Edit Stock</Button>
        </Card>
        { loader ? <Spin size={"large"}/> : <Table columns={columns} dataSource={stockByVendor} />}
        <CustomDrawer visible={drawer} onClose={() => setDrawer(false)} title='Edit Stock'>
            <EditStock stockByVendor={stockByVendor[0]} onClose={() => setDrawer(false)} />
        </CustomDrawer>
    </div>);
}

export default VendorStock
