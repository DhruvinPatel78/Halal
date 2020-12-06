import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "antd";
import Text from "antd/es/typography/Text";
import PayPal from "./Paypal";
import {Helmet} from "react-helmet";
import {addOrder} from "../../Store/Actions/Orders";

const VerifyOrder = (props) => {
    const {orderDetails} = useSelector(state => state.ordersReducer);
    const totalLambCost = orderDetails.lamb * orderDetails.lambCost
    const totalGoatCost = orderDetails.goat * orderDetails.goatCost
    const totalCowCost = orderDetails.cow * orderDetails.cowCost
    const totalCowShare = orderDetails.cowShare && orderDetails.cowShare * orderDetails.cowShareCost
    let totalAmount = totalLambCost + totalCowCost + totalGoatCost;
    totalAmount = totalCowShare ? totalAmount + totalCowShare : totalAmount
    console.log("PROPS",props,orderDetails)
    const dispatch = useDispatch()
    const [showPaypal, setPaypal] = useState(false);
    let url = `https://www.paypal.com/sdk/js?client-id=${orderDetails && orderDetails.paypalClientId}&currency=INR`
    const ConfirmButton = () => (
        <Button size='large' onClick={() => setPaypal(true)}>Confirm Order</Button>
    )
    const CancelButton = () => (
        <Button size='large' onClick={props.setDrawer}>Cancel Order</Button>
    )
    const TotalAmount = () => (
        <Text strong style={{fontSize: "20px"}}>Total Amount - ${totalAmount}</Text>
    )
    const addOrders = () => {
        dispatch(addOrder(orderDetails.lamb,orderDetails.cow,orderDetails.goat,orderDetails.vendorId,totalAmount,orderDetails.cowShare))
        props.setDrawer()
    }
    return (<><Card title={'Verify Your order'} actions={[<TotalAmount/>, <ConfirmButton/>, <CancelButton/>]}>
        <Helmet>
            <script src={url}></script>
        </Helmet>
        <p><Text strong style={{fontSize: "20px"}}>Lamb {orderDetails.lamb} x ${orderDetails.lambCost} =
            ${totalLambCost}</Text></p>
        <p><Text strong style={{fontSize: "20px"}}>Cow {orderDetails.cow} x ${orderDetails.goatCost} =
            ${totalCowCost}</Text></p>
        <p><Text strong style={{fontSize: "20px"}}>Goat {orderDetails.goat} x ${orderDetails.cowCost}=
            ${totalGoatCost}</Text></p>
        { totalCowShare && <p><Text strong style={{fontSize: "20px"}}>Cow Share {orderDetails.cowShare} x ${orderDetails.cowShareCost}=
            ${totalCowShare}</Text></p> }
    </Card>
        { showPaypal && <Card title="Payment With">
            <PayPal
                addOrders={addOrders}
                totalAmount={totalAmount}
            />
        </Card>}
    </>)
}

export default VerifyOrder;
