import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addOrder} from "../../Store/Actions/Orders";

const OrderKg = (props) => {

    const [lamb,setLamb] = useState("");
    const [cow,setCow] = useState("");
    const [goat,setGoat] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ordersReducer);

    const [loader,setLoader] = useState(false);
    const onSubmitHandler = () => {
        if(lamb || cow || goat) {
            dispatch(addOrder(lamb,cow,goat, props.vendorID))
        } else {
            message.error('At least one item should be entered')
        }
    }
    useEffect(() => {
        setLoader(loading);
    },[loading])

    return(
        <Form layout="vertical">
            <Form.Item label="Lamb">
                <Input placeholder="Enter in KG" size="large" value={lamb} onChange={(e) =>  setLamb(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Cow">
                <Input placeholder="Enter in KG" size="large" value={cow} onChange={(e) =>  setCow(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Goat">
                <Input placeholder="Enter in KG" size="large" value={goat} onChange={(e) =>  setGoat(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                { loader ? <Spin size="small" /> : <Button type="primary" onClick={onSubmitHandler}>Confirm Order</Button>}
            </Form.Item>
        </Form>
    )
}

export default OrderKg
