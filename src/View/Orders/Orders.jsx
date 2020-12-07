import React, {useEffect, useState} from "react";
import {Tag, Spin, Col, Card, Row, Typography, Result, Button} from 'antd';
import './Orders.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllActiveVendors, getStockDetails} from "../../Store/Actions/Orders";
import {ShopOutlined} from "@ant-design/icons/lib";
import '../Home/Home.css'
import CustomDrawer from "../../Component/Drawer/Drawer";
import OrderCount from "./OrderCount";
import OrderLbs from "./OrderLbs";
import VerifyOrder from "./VerifyOrder";
const { Title,Text } = Typography;

const Orders = () => {
    const dispatch = useDispatch();
    const {vendors,loading} = useSelector(state => state.ordersReducer)
    const [vendorState,setVendorsState] = useState([]);
    const [loader,setLoader] = useState(false);
    const [contentType, setContentType] = useState(undefined);
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState("");
    const [docId, setDocId] = useState(undefined);
    useEffect(() => {
        dispatch(getAllActiveVendors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(vendors.length) {
            setVendorsState(vendors.map(changes => {
                return changes.doc.data();
            }));
            setDocId(vendors.map(changes => {
                return changes.doc.id;
            }));
        }
    },[vendors])

    useEffect(() => {
            setLoader(loading);
    },[loading])

    const setDrawerContent = (contentType,title,id = '',email = '',paypalClientId = '',address = '') => {
        switch (contentType) {
            case "Lbs": {
                setContentType(<OrderLbs
                    vendorID={id}
                    contentType={contentType}
                    email={email}
                    setDrawerContent={setDrawerContent}
                    paypalClientId={paypalClientId}
                    address={address}
                    onClose={() => setDrawer(false)}
                />);
                setTitle(`Ordering from - ${title}`)
                break
            }
            case "Kgs": {
                setContentType(<OrderLbs
                    vendorID={id}
                    email={email}
                    setDrawerContent={setDrawerContent}
                    paypalClientId={paypalClientId}
                    address={address}
                    contentType={contentType}
                    onClose={() => setDrawer(false)}

                />);
                setTitle(`Ordering from - ${title}`)
                break
            }
            case "Count": {
                setContentType(<OrderCount
                    vendorID={id}
                    email={email}
                    setDrawerContent={setDrawerContent}
                    paypalClientId={paypalClientId}
                    address={address}
                    contentType={contentType}
                    onClose={() => setDrawer(false)}
                />);
                setTitle(`Ordering from - ${title}`)
                break
            }
            case "Verify": {
                setContentType(<VerifyOrder setDrawer={() => setDrawer(false)}/>);
                setTitle(title)
                break
            }
            default : {
                setContentType(<Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => setDrawer(false)}>Back Home</Button>}
                />);
            }
        }
    }

    const onCardClickHandler = (vendor,index) => {
        dispatch(getStockDetails(vendor.Email))
        setDrawer(true)
        setDrawerContent(vendor.StockType,vendor.StoreName,docId[index],vendor.Email,vendor.PaypalClientId,vendor.Address)
    }

    return(<div>
        <Card style={{marginBottom:"20px", height:"75px"}}>
            <Title level={4} style={{float:"left"}}>Vendors</Title>
        </Card>
        { loader ? <Spin size="large" /> :
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                { vendorState && vendorState.map((vendor,index) => {
                        return (
                            <Col className="gutter-row" span={7} >
                                <Card onClick={() => onCardClickHandler(vendor,index)} title={vendor.StoreName} extra={<ShopOutlined />} className='customDesign grow cardAction customBody' bordered={false} actions={[<p><a href={`tel:${vendor.PhoneNumber}`}>{vendor.PhoneNumber}</a>   </p>]}
                                      style={{width: 300, marginBottom: "20px", fontFamily: "Arial, sans-serif"}}>
                                    <p><Title level={4}> <Tag color="#966a4a">Stock in - {vendor.StockType}</Tag></Title></p>
                                    <p><Text strong>Address - {vendor.Address}</Text></p>
                                </Card>
                            </Col>
                        )
                })  }
        </Row> }
        <CustomDrawer visible={drawer} onClose={() => setDrawer(false)} title={title}>
            {contentType}
        </CustomDrawer>
    </div>)
}

export default Orders



