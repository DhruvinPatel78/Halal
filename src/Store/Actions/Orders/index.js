import {
    ADD_ORDER,
    ADD_ORDER_ERROR, CANCEL_ORDER,
    GET_ALL__ACTIVE_VENDORS_ERROR,
    GET_ALL_ACTIVE_VENDORS,
    GET_ORDER_BY_VENDOR,
    GET_ORDER_BY_VENDOR_ERROR,
    GET_ORDER_HISTORY,
    GET_ORDER_HISTORY_ERROR,
    GET_PROFILE_DATA_ERROR,
    GET_STOCK,
    GET_STOCK_ERROR,
    GET_VENDOR_STOCK,
    LOADER_AUTH,
    VERIFY_ORDER
} from "../../ActionsType/actiontypes";
import {db} from "../../../firebase";
import {message} from "antd";


export const getAllActiveVendors = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('User').where("IsActive","==",1).where("Type","==","vendor").get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ALL_ACTIVE_VENDORS ,payload:res.docChanges() });
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ALL__ACTIVE_VENDORS_ERROR ,payload:error });
        });
    }
}
export const getStockDetails = (email) => {
    return (dispatch) => {
        db.collection('Stock').where("Email","==",email).get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_STOCK ,payload:res.docChanges()[0].doc.data() });
        }).catch( error => {
            console.log("error",error);
            message.error('Something went wrong with stock')
            dispatch({ type: GET_STOCK_ERROR ,payload:error });
        });
    }
}


export const getStockByVendor = () => {
    return (dispatch) => {
        const email = localStorage.getItem('email')
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection('Stock').where("Email","==",email).get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_VENDOR_STOCK ,payload:res.docChanges()});
        }).catch( error => {
            console.log("error",error);
            message.error('Something went wrong with stock')
            dispatch({ type: GET_VENDOR_STOCK ,payload:error });
            dispatch({ type: LOADER_AUTH ,payload:false });
        });
    }
}
export const getOrdersHistory = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection('Order').where("UserID","==",email).get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ORDER_HISTORY ,payload: res.docChanges() });
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ORDER_HISTORY_ERROR ,payload:error });
        });
    }
}


export const addOrder = (lamb,cow,goat,vendorId,totalAmount,cowshare =  0) => {

    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection('Order').doc().set({
            'Cow':+cow,
            'Goat':+goat,
            'Lamb':+lamb,
            'CowShare':cowshare,
            'UserID':email,
            'VendorId':vendorId,
            'DevliveryAddress':"CANADA",
            'OrderDate':new Date(),
            'Status':'pending',
            'Total': totalAmount
        }).then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.info('adding your order')
            dispatch({ type: ADD_ORDER ,payload: res });
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.error('Something went wrong')
            dispatch({ type: ADD_ORDER_ERROR ,payload:error });
        });
    }
}

export const getOrderByVendor = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection('Order').where("VendorId","==",email).get().then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_ORDER_BY_VENDOR ,payload: res.docChanges() });
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_ORDER_BY_VENDOR_ERROR ,payload:error });
        });
    }
}

export const orderDetails = (orderDetails) => {
    return (dispatch) => {
            dispatch({ type: VERIFY_ORDER ,payload: orderDetails});
    }
}

export const cancelOrder = () => {
    return (dispatch) => {
        dispatch({ type: CANCEL_ORDER ,payload: orderDetails});
    }
}

export const updateOrderStatus = (status, orderId,lamb,cow,goat,cowShare) => {

    return (dispatch) => {
        dispatch({type: LOADER_AUTH, payload: true});
        db.collection("Order")
            .doc(orderId)
            .update({
                Status: status,
            })
            .then(() => {
                if(status === 'complete') {

                    dispatch(minusStock(lamb,cow,goat,cowShare))
                } else {
                    dispatch(getOrderByVendor())
                }
                dispatch({type: LOADER_AUTH, payload: false});
            })
            .catch(error => {
                dispatch({type: LOADER_AUTH, payload: false});
            });
    }
}

export const minusStock = (lamb,cow,goat,cowShare) => {

    return (dispatch) => {
        dispatch({type: LOADER_AUTH, payload: true});
        const email = localStorage.getItem('email')
        db.collection("Stock")
            .where("Email", "==", email)
            .get()
            .then(result => {
                const data = result.docChanges()[0].doc.data();
                const stockId = result.docChanges()[0].doc.id;
                let newLmb = parseInt(data.Lamb) - parseInt(lamb);
                let newCow= parseInt(data.Cow) - parseInt(cow);
                let newGoat = parseInt(data.Goat) - parseInt(goat);
                let newCowShare = parseInt(data.CowShare) - parseInt(cowShare);
                db.collection("Stock")
                    .doc(stockId)
                    .update({
                        Lamb:newLmb.toString(),
                        Cow: newCow.toString(),
                        Goat: newGoat.toString(),
                        CowShare: newCowShare.toString()
                    })
                    .then(() => {
                        console.log("User updated!");
                        dispatch(getOrderByVendor())
                        dispatch({type: LOADER_AUTH, payload: false});
                    })
                    .catch(error => {
                        dispatch({type: GET_PROFILE_DATA_ERROR, payload: error});
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({type: GET_PROFILE_DATA_ERROR, payload: error});
            });
    }
}

export const updateStockDetails = (stockDetails) => {

    return (dispatch) => {
        dispatch({type: LOADER_AUTH, payload: true});
        const email = localStorage.getItem('email')
        db.collection("Stock")
            .where("Email", "==", email)
            .get()
            .then(result => {
                const stockId = result.docChanges()[0].doc.id;
                db.collection("Stock")
                    .doc(stockId)
                    .update({
                        Lamb:stockDetails.lamb,
                        LambCost:stockDetails.lambCost,
                        Cow: stockDetails.cow,
                        CowCost: stockDetails.cowCost,
                        Goat: stockDetails.goat,
                        GoatCost: stockDetails.goatCost,
                        CowShare:stockDetails.cowShare ,
                        CowShareCost:stockDetails.cowShareCost
                    })
                    .then(() => {
                        dispatch(getStockByVendor())
                        dispatch({type: LOADER_AUTH, payload: false});
                    })
                    .catch(error => {
                        dispatch({type: GET_PROFILE_DATA_ERROR, payload: error});
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({type: GET_PROFILE_DATA_ERROR, payload: error});
            });
    }
}



