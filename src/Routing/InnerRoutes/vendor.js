import PrivateRoute from "../PrivateRoute";
import ContactUs from "../../View/ContactUs/ContactUs";
import React from "react";
import {Redirect} from "react-router";

const vendorRoute = () => {
    return(<>
        <PrivateRoute exact path="/vendor" Component={() => <Redirect to="/vendor/contact-us" />} userType="vendor"/>
        <PrivateRoute exact path="/vendor/contact-us" Component={ContactUs} userType="vendor"/>
        <PrivateRoute exact path="/vendor/profile" Component={ContactUs} userType="vendor"/></>)
}
export default vendorRoute;
