import { Product } from "../../utils/type";
import { AppDispatch } from "../store";
import { GET_PRODUCTS_SUCCESS, PRODUCT_ERROR, PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./app.actionTypes";
import { getProductsAPI, updateProductAPI } from "./app.api";

export interface IProductRequest {
    type: typeof PRODUCT_REQUEST;
}

export interface IGetProductSuccess {
    type: typeof GET_PRODUCTS_SUCCESS;
    payload: Product[];
}

export interface IUpdateProductSuccess {
    type: typeof UPDATE_PRODUCT_SUCCESS;
    payload: Product;
}

export interface IProductError {
    type: typeof PRODUCT_ERROR
}

export type AppAction = IProductRequest | IGetProductSuccess | IUpdateProductSuccess | IProductError;

const productRequest = (): IProductRequest => {
    return {
        type: PRODUCT_REQUEST
    }
}

const getProductSuccess = (data: Product[]): IGetProductSuccess => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: data
    }
}

const updateProductSuccess = (payload: Product): IUpdateProductSuccess => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload
    }
}

const productError = (): IProductError => {
    return {
        type: PRODUCT_ERROR
    }
}

export const getProducts = (getProductsParam?: { params: { category: string[], _sort: string, _order: string | null }; }): any => async (dispatch: AppDispatch) => {

    dispatch(productRequest());

    try {
        let data = await getProductsAPI(getProductsParam);

        if (data) {
            dispatch(getProductSuccess(data));
        }
    }
    catch (err) {
        dispatch(productError());
    }
}

export const updateProduct = (id: number, payload: { title: string; price: number }): any => async (dispatch: AppDispatch) => {

    dispatch(productRequest());

    try {
        let data = await updateProductAPI(id, payload);
        if (data) {
            dispatch(updateProductSuccess(data));
        }
    } catch (e) {
        dispatch(productError());
    }
}