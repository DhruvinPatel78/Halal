import {
    GET_ALL_USERS,
    GET_ALL_USERS_ERROR,
    GET_ALL_VENDORS,
    GET_ALL_VENDORS_ERROR,
    LOADER_AUTH,
    ADD_VENDOR_ERROR,
    GET_ALL_ORDERS,
    GET_ALL_ORDERS_ERROR
} from "../../ActionsType/actiontypes";
import {db} from "../../../firebase";
import {message} from "antd";

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('User').get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ALL_USERS ,payload:res.docChanges() });
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ALL_USERS_ERROR ,payload:error });
        });
    }
}

export const getAllVendors = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('Vendor').get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ALL_VENDORS ,payload:res.docChanges() });
        }).catch(error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ALL_VENDORS_ERROR ,payload:error });
        });
    }
}


// export const blockUnblockUser = (email,block) => {
//     return (dispatch) => {
//         dispatch({ type: LOADER_AUTH ,payload:true });
//         auth
//         // au'User').get().then((res) => {
//         //     dispatch({ type: LOADER_AUTH ,payload:false });
//         //     dispatch({ type: BLOCK_USER ,payload:res });
//         // }).catch( error => {
//         //     dispatch({ type: LOADER_AUTH ,payload:false });
//         //     console.log("error",error);
//         //     message.error('Something went wrong')
//         //     dispatch({ type: BLOCK_USER_ERROR ,payload:error });
//         // });
//     }
// }

export const addVendor = (vendorData,callback) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('User').doc().set({
            'Email':vendorData.email.toLowerCase(),
            'Name':vendorData.name,
            'Address':vendorData.address,
            'PhoneNumber':vendorData.phone,
            'IsActive':0,
            'Type':'vendor',
            'StockType':vendorData.stockType,
            'PaypalClientId':vendorData.paypal,
            'StoreName':vendorData.storeName
        }).then((res) => {
            console.log("res",res);
            dispatch({ type: LOADER_AUTH ,payload:false });
            // dispatch(getAllUsers())
            callback(res)
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            // message.error('Something went wrong')
            dispatch({ type: ADD_VENDOR_ERROR ,payload:error });
        });
    }
}

export const getAllOrders = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('Order').get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ALL_ORDERS ,payload:res.docChanges() });
        }).catch(error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ALL_ORDERS_ERROR ,payload:error });
        });
    }
}

export const addInitialStockDetails = (vendorEmail) => {
    return (dispatch) => {
        dispatch({type: LOADER_AUTH, payload: true});
        db.collection("Stock").doc()
            .set({
                Lamb:"0",
                LambCost:"0",
                Cow: "0",
                CowCost: "0",
                Goat: "0",
                GoatCost: "0",
                CowShare:"0" ,
                CowShareCost:"0",
                Email:vendorEmail
            })
            .then(result => {
                dispatch({type: LOADER_AUTH, payload: false});
                message.success('Added Initial Stock')
            })
            .catch(error => {
                console.log(error);
                message.error('Error while adding initial stock')
            });
    }
}

