import React, {useEffect, useState} from "react";
import {Button, Form, InputNumber, message, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getStockDetails, orderDetails} from "../../Store/Actions/Orders";
import {PlusCircleOutlined,MinusCircleOutlined} from "@ant-design/icons/lib";
import Text from "antd/es/typography/Text";

const OrderCount = (props) => {
    const [lamb,setLamb] = useState(0);
    const [cow,setCow] = useState(0);
    const [goat,setGoat] = useState(0);
    const [cowShare,setCowShare] = useState(0);
    const [stockDetails,setStockDetails] = useState(undefined);
    const dispatch = useDispatch();
    const {stockDetail} = useSelector(state => state.ordersReducer);
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        dispatch(getStockDetails(props.email))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        if(stockDetail) {
            setStockDetails(stockDetail)
            setLoader(false)
        }
    },[stockDetail])
    const verifyOder = () => {
        if(lamb || cow || goat || cowShare) {
            if(parseInt(lamb) >= (parseInt(stockDetails.Lamb)) ) {
                message.error("Lamb  should not be more then its stock")
            }  if (parseInt(cow) >= parseInt(stockDetails.Cow)) {
                message.error("Cow  should not be more then its stock")
            }  if (parseInt(goat) >= parseInt(stockDetails.Goat)) {
                message.error("Goat  should not be more then its stock")
            }
            if (parseInt(cowShare) >= parseInt(stockDetails.CowShare)) {
                message.error("Cow share  should not be more then its stock")
            }
            if(
                parseInt(lamb) < (parseInt(stockDetails.Lamb)) &&
                parseInt(cow) < parseInt(stockDetails.Cow)  &&
                parseInt(goat) < parseInt(stockDetails.Goat) &&
                parseInt(cowShare) < parseInt(stockDetails.CowShare)
            ) {
                props.setDrawerContent('Verify','Verify Order')
                dispatch(orderDetails({
                    lamb,
                    cow,
                    goat,
                    cowShare,
                    lambCost:stockDetails.LambCost,
                    cowCost:stockDetails.CowCost,
                    goatCost:stockDetails.GoatCost,
                    cowShareCost:stockDetails.CowShareCost,
                    paypalClientId:props.paypalClientId,
                    address:props.address,
                    vendorId:props.email
                }))
            }

        } else {
            message.error('At least one item should be entered')
        }
    }

    return(
        <Form layout="vertical">
            <Text>(Lamb Stock - {stockDetails && stockDetails.Lamb}, Lamb Cost - ${stockDetails && stockDetails.LambCost}) </Text>
            <Form.Item label="Lamb">
                <InputNumber min={0} style={{width:"70%"}} disabled  size="large" defaultValue={0} value={lamb} onChange={(value) =>  setLamb(value)}/>
                <PlusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setLamb(lamb + 1)}/>
                <MinusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setLamb(lamb - 1)}/>
            </Form.Item>
            <Text>(Cow Stock - {stockDetails && stockDetails.Cow}, Lamb Cost - ${stockDetails && stockDetails.CowCost}) </Text>
            <Form.Item label="Cow">
                <InputNumber min={0} style={{width:"70%"}} disabled size="large"   defaultValue={0}  value={cow} onChange={(value) =>  setCow(value)} />
                <PlusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setCow(cow + 1)}/>
                <MinusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setCow(cow - 1)}/>
            </Form.Item>
            <Text>(Goat Stock - {stockDetails && stockDetails.Goat}, Lamb Cost - ${stockDetails && stockDetails.Goat}) </Text>
            <Form.Item label="Goat">
                <InputNumber min={0} style={{width:"70%"}} disabled size="large"  defaultValue={0}  value={goat} onChange={(value) =>  setGoat(value)} />
                <PlusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setGoat(goat + 1)}/>
                <MinusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setGoat(goat - 1)}/>
            </Form.Item>
            <Text>(Goat Stock - {stockDetails && stockDetails.CowShare}, Lamb Cost - ${stockDetails && stockDetails.CowShare}) </Text>
            <Form.Item label="Cow Share">
                <InputNumber min={0} style={{width:"70%"}} disabled size="large"  defaultValue={0}  value={cowShare} onChange={(value) =>  setCowShare(value)} />
                <PlusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setCowShare(cowShare + 1)}/>
                <MinusCircleOutlined style={{fontSize:"25px",marginLeft:"20px"}} onClick={() => setCowShare(cowShare - 1)}/>
            </Form.Item>
            <Form.Item>
                { loader ? <Spin size="small" /> : <Button type="primary" onClick={verifyOder}>Confirm Order</Button>}
            </Form.Item>
        </Form>
    )
}

export default OrderCount
