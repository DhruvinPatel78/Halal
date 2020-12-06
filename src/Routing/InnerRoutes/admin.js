import PrivateRoute from "../PrivateRoute";
import UserList from "../../View/Admin/Users/Users";
import ContactUs from "../../View/ContactUs/ContactUs";
import React from "react";
import {Redirect} from "react-router";

const adminRoute = () => {
    return(<>
        <PrivateRoute exact path="/admin" Component={() => <Redirect to="/admin/users" />} userType="admin"/>
        <PrivateRoute exact path="/admin/users" Component={UserList} userType="admin"/>
        <PrivateRoute exact path="/admin/profile" Component={ContactUs} userType="admin" />
        <PrivateRoute exact path="/admin/all-orders" Component={ContactUs} userType="admin"/></>)
}
export default adminRoute;