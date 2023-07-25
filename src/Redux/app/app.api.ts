import axios, { AxiosResponse } from "axios";
import { Product } from "../../utils/type";

const API_BASE_URL = "https://good-puce-caterpillar-boot.cyclic.app";

export const getProductsAPI = async (getProductsParam?: { params: { category: string[] }; }) => {
    try {
        let response : AxiosResponse<Product[]> = await axios.get(
            `${API_BASE_URL}/products`, getProductsParam
        );

        return response.data;
    }
    catch (err) {
        console.error("getProductsAPI error", err);
    }
}


export const updateProductAPI = async (id: number, payload: { title: string, price: number }) => {
    try {
        let response : AxiosResponse<Product> = await axios.patch(
            `${API_BASE_URL}/products/${id}`, payload
        );

        return response.data;
    }
    catch (err) {
        console.error("updateProductsAPI error", err);
    }
}