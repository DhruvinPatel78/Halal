import React from "react";
import {Card, Drawer, Typography} from 'antd';
const { Title } = Typography;


const CustomDrawer = (props) => (
        <Drawer
            width={700}
            placement="right"
            closable={true}
            onClose={props.onClose}
            visible={props.visible}>
            <Card style={{marginBottom:"20px",marginTop:"20px", height:"75px",backgroundColor:"#f0f2f5"}}>
                <Title level={4} style={{float:"left"}}>{props.title}</Title>
            </Card>
            {props.children}
        </Drawer>
    );


export default CustomDrawer
