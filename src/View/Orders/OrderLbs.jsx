import React, {useEffect, useState} from "react";
import {Form, Input, Button, message, Spin} from 'antd';
import {orderDetails,cancelOrder} from "../../Store/Actions/Orders";
import {useDispatch, useSelector} from "react-redux";
import Text from "antd/es/typography/Text";

const OrderLbs = (props) => {

    const [lamb,setLamb] = useState(0);
    const [cow,setCow] = useState(0);
    const [goat,setGoat] = useState(0);
    const [stockDetails,setStockDetails] = useState(undefined);
    const dispatch = useDispatch();
    const {stockDetail} = useSelector(state => state.ordersReducer);
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        if(stockDetail) {
            setStockDetails(stockDetail)
            setLoader(false)
        }
    },[stockDetail])

    const verifyOder = () => {
        if(lamb || cow || goat) {
            if(parseInt(lamb) >= (parseInt(stockDetails.Lamb)) ) {
                message.error("Lamb quantity should not be more then its stock")
            }  if (parseInt(cow) >= parseInt(stockDetails.Cow)) {
                message.error("Cow quantity should not be more then its stock")
            }  if (parseInt(goat) >= parseInt(stockDetails.Goat)) {
                message.error("Goat quantity should not be more then its stock")
            }
           if(
               parseInt(lamb) < (parseInt(stockDetails.Lamb)) &&
               parseInt(cow) < parseInt(stockDetails.Cow)  &&
               parseInt(goat) < parseInt(stockDetails.Goat)
           ) {
                props.setDrawerContent('Verify','Verify Order')
                dispatch(orderDetails({
                    lamb,
                    cow,
                    goat,
                    lambCost:stockDetails.LambCost,
                    cowCost:stockDetails.CowCost,
                    goatCost:stockDetails.GoatCost,
                    paypalClientId:props.paypalClientId,
                    address:props.address,
                    vendorId:props.email
                }))
            }

        } else {
            message.error('At least one item should be entered')
        }
    }
    const cancelOrders = () => {
        dispatch(cancelOrder())
        props.onClose();

    }


    return(
        <>
        <Form layout="vertical">
            { loader ? <Spin size="large" style={{position:"absolute",left:"50%"}} /> :
                <><Text>(Lamb Stock - {stockDetails && stockDetails.Lamb}, Lamb Cost - ${stockDetails && stockDetails.LambCost}) </Text>
        <Form.Item label={`Order Lamb in ${props.contentType.toUpperCase()}`}>
            <Input type={"number"} placeholder="Enter in LBS" size="large" value={lamb} onChange={(e) =>  setLamb(e.target.value)} />
        </Form.Item>
            <Text>(Cow Stock - {stockDetails && stockDetails.Cow}, Lamb Cost - ${stockDetails && stockDetails.CowCost}) </Text>
        <Form.Item label={`Order Cow in ${props.contentType.toUpperCase()}`}>
            <Input type={"number"} placeholder="Enter in LBS" size="large"  value={cow} onChange={(e) =>  setCow(e.target.value)} />
        </Form.Item>
            <Text>(Goat Stock - {stockDetails && stockDetails.Goat}, Lamb Cost - ${stockDetails && stockDetails.Goat}) </Text>
        <Form.Item label={`Order Goat in ${props.contentType.toUpperCase()}`}>
            <Input type={"number"} placeholder="Enter in LBS"  size="large"   value={goat} onChange={(e) =>  setGoat(e.target.value)}/>
        </Form.Item>
        <Form.Item>
           <Button type="primary" onClick={verifyOder}>Next</Button>
            <Button type="primary" onClick={cancelOrders}>Cancel</Button>
        </Form.Item></>
            }
    </Form> </>)
}

export default OrderLbs
