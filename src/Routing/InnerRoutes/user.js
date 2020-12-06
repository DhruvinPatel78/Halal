import PrivateRoute from "../PrivateRoute";
import Home from "../../View/Home/Home";
import UserProfile from "../../View/UserProfile/UserProfile";
import Orders from "../../View/Orders/Orders";
import OrderHistory from "../../View/OrderHistory/OrderHistory";
import ContactUs from "../../View/ContactUs/ContactUs";
import React from "react";
import {Redirect} from "react-router";

const userRoute = () => {
    return(<>
        <PrivateRoute exact path="/" Component={Home}  userType="user"/>
        <PrivateRoute exact path="/profile" Component={UserProfile} userType="user"/>
        <PrivateRoute exact path="/new-order" Component={Orders} userType="user"/>
        <PrivateRoute exact path="/order-history" Component={OrderHistory} userType="user"/>
        <PrivateRoute exact path="/contact-us" Component={ContactUs} userType="user"/></>)
}
export default userRoute;