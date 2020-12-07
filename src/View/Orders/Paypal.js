import React,{useEffect} from 'react'
import {message} from "antd";

const PayPal = (props) => {
    const paypalRef = React.useRef();
    const  {totalAmount,addOrders} = props
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div>
            <div ref={paypalRef} />
        </div>
    )
}

export default PayPal;
