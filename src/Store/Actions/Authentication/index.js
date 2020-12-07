import {
    LOGIN_ERROR,
    REGISTER_ERROR,
    LOADER_AUTH,
    GET_PROFILE_DATA_ERROR,
    GET_PROFILE_DATA,
    ADD_PROFILE_DATA,
    ADD_PROFILE_DATA_ERROR,
    UPDATE_STORE_STATUS_ERROR
} from "../../ActionsType/actiontypes";
import {db,auth} from "../../../firebase";
import {message} from "antd";

export const login = (email,password, callBack) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        auth.signInWithEmailAndPassword(email,password).then((response) => {
            db.collection('User').where("Email","==",email).get().then(res => {
                dispatch({ type: LOADER_AUTH ,payload:false });
                callBack(response,res.docChanges()[0].doc.data().Type);
                console.log("Logged in data",)
            }).catch(err => {
                console.log(err)
            })


        }).catch( error => {
            console.log(error)
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.error('Something went wrong')
            dispatch({ type: LOGIN_ERROR ,payload:error });
        });
    }
}
export const logout = (callback) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        auth.signOut().then((response) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            callback(response)

        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.error('Log out Failed')
            console.log('err',error)
            dispatch({ type: LOGIN_ERROR ,payload:error });
        });
    }
}


export const registration = (email,password,callback) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        auth.createUserWithEmailAndPassword(email,password).then((response) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            callback(response)
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.error('Something went wrong')
            dispatch({ type: REGISTER_ERROR ,payload:error });
        });
    }
}
export const getProfileData = () => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection('User').where('Email','==',email).get().then((res) => {
            // console.log("response",res.docChanges()[0].doc.data())
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: GET_PROFILE_DATA ,payload:res.docChanges()[0].doc.data()});
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: GET_PROFILE_DATA_ERROR ,payload:error });
        });
    }
}

export const updatePassword = (newPassword) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        auth.currentUser.updatePassword(newPassword).then((res) => {
            console.log("response",res)
            dispatch({ type: LOADER_AUTH ,payload:false });
            message.success('Password Changed')
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Session Expire Login Again to change Password')
            dispatch({ type: GET_PROFILE_DATA_ERROR ,payload:error });
        });
    }
}

export const addProfileData = (name,address,phoneNumber) => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection('User').doc().set({
            'Email':email.toLowerCase(),
            'Name':name,
            'Address':address,
            'PhoneNumber':phoneNumber,
            'IsActive':1,
            'Type':'user'
        }).then((res) => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            dispatch({ type: ADD_PROFILE_DATA ,payload: res});
        }).catch( error => {
            dispatch({ type: LOADER_AUTH ,payload:false });
            console.log("error",error);
            message.error('Something went wrong')
            dispatch({ type: ADD_PROFILE_DATA_ERROR ,payload:error });
        });
    }
}

export const updateProfile = (name,address,phoneNumber,storeName = '') => {
    return (dispatch) => {
        dispatch({ type: LOADER_AUTH ,payload:true });
        const email = localStorage.getItem('email')
        db.collection("User")
            .where("Email", "==", email)
            .get()
            .then(result => {
                const id = result.docChanges()[0].doc.id;
                db.collection("User")
                    .doc(id)
                    .update({
                        Name: name,
                        PhoneNumber: phoneNumber,
                        Address: address,
                        StoreName:storeName
                    })
                    .then(() => {
                        console.log("User updated!");
                        dispatch({
                            type: GET_PROFILE_DATA,
                            payload:{
                                Name:  name,
                                PhoneNumber: phoneNumber,
                                Address: address,
                                StoreName:storeName
                            }
                        });
                        dispatch({ type: LOADER_AUTH ,payload:false });
                    })
                    .catch(error => {
                        dispatch({ type:GET_PROFILE_DATA_ERROR, payload: error });
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: GET_PROFILE_DATA_ERROR, payload: error });
            });
    }
}
export const updateStoreStatus = (status) => {
    return (dispatch) => {
        const email = localStorage.getItem('email')
        dispatch({ type: LOADER_AUTH ,payload:true });
        db.collection("User")
            .where("Email", "==", email)
            .get()
            .then(result => {
                const id = result.docChanges()[0].doc.id;
                db.collection("User")
                    .doc(id)
                    .update({
                        IsActive:status
                    })
                    .then((res) => {
                        console.log("User updated!");
                        dispatch({
                            type: GET_PROFILE_DATA,
                            payload: {
                                IsActive:status
                            }
                        });
                        dispatch({ type: LOADER_AUTH ,payload:false });
                    })
                    .catch(error => {
                        dispatch({ type:UPDATE_STORE_STATUS_ERROR, payload: error });
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: LOADER_AUTH ,payload:false });
                dispatch({ type: UPDATE_STORE_STATUS_ERROR, payload: error });
            });
    }
}




