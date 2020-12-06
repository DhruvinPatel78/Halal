import React,{useEffect} from 'react'
import {message} from "antd";
import {useHistory} from "react-router";

const PayPal = (props) => {
    const paypalRef = React.useRef();
    const  {totalAmount,addOrders} = props
    const history = useHistory()
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {

                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Your description",

                                amount: {
                                    currency_code: "INR",
                                    value: totalAmount,
                                },
                            },

                        ],
                    });
                },
                onApprove: (data, actions) => {
                    actions.order.capture().then(details => {
                        message.success('PaymentSuccess');
                        addOrders();
                    });

                },
                onError: (err) => {
                     message.error('Failed');
                    console.error(err);
                },
            })
            .render(paypalRef.current)
    }, []);



    return (
        <div>
            <div ref={paypalRef} />
        </div>
    )
}

export default PayPal;