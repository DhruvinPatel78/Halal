import React from "react";
import {Timeline, Card} from 'antd';
import {MobileOutlined,SendOutlined,GlobalOutlined,InstagramOutlined} from "@ant-design/icons";
import "../Home/Home.css"

const ContactUs = () => {
    return(<div>
        <Card style={{width:"100%",borderRadius:"15px"}} title="Contact Us" className="customDesign" >
        <Timeline>
            <Timeline.Item><MobileOutlined /> Phone: 416-346-0632</Timeline.Item>
            <Timeline.Item><SendOutlined /> Email: info@halalmkt.ca</Timeline.Item>
            <Timeline.Item><GlobalOutlined /> Website: halalmkt.ca</Timeline.Item>
            <Timeline.Item><InstagramOutlined /> Intagram: instagram.com/halalmkt </Timeline.Item>
        </Timeline>
        </Card>
    </div>)
}

export default ContactUs
