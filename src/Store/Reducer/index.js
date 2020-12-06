import { combineReducers } from 'redux';
import {authenticationReducer} from "./Login";
import {ordersReducer} from "./Orders";
import {adminReducer} from "./Admin";


export default combineReducers({
    authenticationReducer,
    ordersReducer,
    adminReducer
});