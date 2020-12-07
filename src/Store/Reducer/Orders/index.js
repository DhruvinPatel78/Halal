import {
    LOADER_AUTH,
    GET_ALL_ACTIVE_VENDORS,
    GET_ALL__ACTIVE_VENDORS_ERROR,
    GET_ORDER_HISTORY,
    GET_ORDER_HISTORY_ERROR,
    ADD_ORDER,
    ADD_ORDER_ERROR,
    GET_STOCK,
    GET_STOCK_ERROR,
    VERIFY_ORDER,
    GET_ORDER_BY_VENDOR,
    GET_ORDER_BY_VENDOR_ERROR, GET_VENDOR_STOCK, GET_VENDOR_STOCK_ERROR, CANCEL_ORDER
} from "../../ActionsType/actiontypes";
import {initialOrdersState} from "./initialState";

export const ordersReducer = (state = initialOrdersState, action) => {
    switch (action.type) {
        case GET_ALL_ACTIVE_VENDORS: {
            return {
                ...state,
                vendors: action.payload,
            }
        }
        case LOADER_AUTH: {
            return {
                ...state,
                loading: action.payload,
            }
        }
        case GET_ALL__ACTIVE_VENDORS_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case GET_ORDER_HISTORY: {
            return {
                ...state,
                orderHistory: action.payload,
            }
        }
        case GET_ORDER_HISTORY_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case ADD_ORDER: {
            return {
                ...state,
                order: action.payload,
            }
        }
        case ADD_ORDER_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case GET_STOCK: {
            return {
                ...state,
                stockDetail: action.payload,
            }
        }
        case GET_STOCK_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case VERIFY_ORDER: {
            return {
                ...state,
                orderDetails: action.payload,
            }
        }
        case GET_ORDER_BY_VENDOR: {
            return {
                ...state,
                vendorOrder: action.payload
            }
        }
        case GET_ORDER_BY_VENDOR_ERROR: {
            return {
                ...state,
                orderDetails: action.payload,
            }
        }
        case GET_VENDOR_STOCK: {
            return {
                ...state,
                vendorStock: action.payload,
            }
        }
        case GET_VENDOR_STOCK_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case CANCEL_ORDER: {
            return {
                ...state,
                stockDetail: undefined,
            }
        }
        default: {
            return {...state};
        }
    }
}
