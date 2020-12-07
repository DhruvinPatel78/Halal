import React from "react";
import {Card, Row, Col} from "antd";
import ProfileLogo from '../../Common/image/group.png'
import OrderLogo from '../../Common/image/clipboard.png'
import OrderHistory from '../../Common/image/browsing.png'
import ContactUs from '../../Common/image/conversation.png'
import "./Home.css"
import {useHistory} from "react-router";
const Home = () => {
    const history = useHistory();
    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={7}>
                <Card title="Profile" className='customDesign grow' bordered={false} onClick={() => history.push('/profile')}
                      style={{width: 300, borderRadius: "15px", marginBottom: "20px", fontFamily: "Arial, sans-serif"}}>
                    <img src={ProfileLogo} alt={"ProfileLogo"} style={{height:"100px",width:"100px"}}/>
                </Card>
            </Col>
            <Col className="gutter-row" span={7}>
                <Card title="New Order" className='customDesign grow' bordered={false} onClick={() => history.push('/new-order')}
                      style={{width: 300, borderRadius: "15px", marginBottom: "20px", fontFamily: "Arial, sans-serif"}}>
                    <img src={OrderLogo} alt={"OrderLogo"} style={{height:"100px",width:"100px"}}/>
                </Card>
            </Col>
            <Col className="gutter-row" span={7}>
                <Card title="Order History" className='customDesign grow' bordered={false} onClick={() => history.push('/order-history')}
                      style={{width: 300, borderRadius: "15px", marginBottom: "20px", fontFamily: "Arial, sans-serif"}}>
                    <img src={OrderHistory} alt={"OrderHistoryLogo"} style={{height:"100px",width:"100px"}}/>
                </Card>
            </Col>
            <Col className="gutter-row" span={7}>
                <Card title="Contact us" className='customDesign grow' bordered={false} onClick={() => history.push('/contact-us')}
                      style={{width: 300, borderRadius: "15px", marginBottom: "20px", fontFamily: "Arial, sans-serif"}}>
                    <img src={ContactUs} alt={"ContactUsLogo"} style={{height:"100px",width:"100px"}}/>
                </Card>
            </Col>
        </Row>
    </div>)
}

export default Home
