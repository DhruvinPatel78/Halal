import {
    LOADER_AUTH,
    GET_ALL_USERS,
    GET_ALL_VENDORS,
    GET_ALL_VENDORS_ERROR,
    GET_ALL_USERS_ERROR,
    ADD_VENDOR,
    ADD_VENDOR_ERROR, GET_ALL_ORDERS, GET_ALL_ORDERS_ERROR
} from "../../ActionsType/actiontypes";
import {initialAdminState} from "./initialState";

export const adminReducer = (state = initialAdminState, action) => {
    switch (action.type) {
        case GET_ALL_VENDORS: {
            return {
                ...state,
                all_vendors: action.payload,
            }
        }
        case GET_ALL_USERS: {
            return {
                ...state,
                all_users: action.payload,
            }
        }
        case GET_ALL_USERS_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case LOADER_AUTH: {
            return {
                ...state,
                loading: action.payload,
            }
        }
        case GET_ALL_VENDORS_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case ADD_VENDOR: {
            return {
                ...state,
                add_vendors: action.payload,
            }
        }
        case ADD_VENDOR_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case GET_ALL_ORDERS: {
            return {
                ...state,
                all_orders: action.payload,
            }
        }
        case GET_ALL_ORDERS_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        default: {
            return {...state};
        }
    }
}