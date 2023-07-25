import axios, { AxiosResponse } from "axios";
import { LoginData } from "../../utils/type";

export const userLoginAPI = async (payload: LoginData) => {
    try{
        let response : AxiosResponse<{ token: string }> = await axios.post(
            "https://reqres.in/api/login",
            payload
        );

        return response.data.token;
    }
    catch(err){
        console.error("userLoginAPI error", err);
    }
}