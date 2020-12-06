import {
    LOGIN_ERROR,
    REGISTER_ERROR,
    REGISTER,
    LOGIN,
    LOADER_AUTH,
    GET_PROFILE_DATA,
    GET_PROFILE_DATA_ERROR,
    ADD_PROFILE_DATA,
    ADD_PROFILE_DATA_ERROR, UPDATE_STORE_STATUS, UPDATE_STORE_STATUS_ERROR
} from "../../ActionsType/actiontypes";
import {initialAuthenticationState} from "./initialState";

export const authenticationReducer = (state = initialAuthenticationState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loggedIn: action.payload,
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                error: 'Something Went wrong !',
            }
        }
        case LOADER_AUTH: {
            return {
                ...state,
                loading: action.payload,
            }
        }
        case REGISTER: {
            return {
                ...state,
                register: action.payload,
            }
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                error: "something went wrong",
            }
        }
        case GET_PROFILE_DATA: {
            return {
                ...state,
                profileData:{
                    ...state.profileData,
                    ...action.payload
                },
                exist: true
            }
        }
        case GET_PROFILE_DATA_ERROR: {
            return {
                ...state,
                error: "something went wrong",
                exist: false
            }
        }
        case ADD_PROFILE_DATA: {
            return {
                ...state,
                profileSuccess:true,
            }
        }
        case ADD_PROFILE_DATA_ERROR: {
            return {
                ...state,
                error: "something went wrong",
            }
        }
        case UPDATE_STORE_STATUS: {
            return {
                ...state,
                storeStatus: action.payload
            }
        }
        case UPDATE_STORE_STATUS_ERROR: {
            return {
                ...state,
                error: "something went wrong",
            }
        }


        default: {
            return {...state};
        }
    }
}