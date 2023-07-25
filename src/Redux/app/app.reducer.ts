import { Product } from "../../utils/type";
import { AppAction } from "./app.action";
import { GET_PRODUCTS_SUCCESS, PRODUCT_ERROR, PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./app.actionTypes";

export interface IAppState {
    loading: boolean;
    error: boolean;
    data: Product[];
}

const initialState = {
    loading: false,
    error: false,
    data: [],
};

export const appReducer = (state: IAppState = initialState, action: AppAction): IAppState => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_ERROR:
            return { ...state, loading: false, error: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map((item) => item.id === action.payload.id ? action.payload : item)
            };
        default:
            return state;
    }
};