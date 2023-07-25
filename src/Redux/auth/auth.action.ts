import { LoginData } from "../../utils/type";
import { AppDispatch } from "../store";
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "./auth.actionTypes"
import { userLoginAPI } from "./auth.api";

export interface IUserLoginRequest {
    type: typeof USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccess {
    type: typeof USER_LOGIN_SUCCESS;
    payload: string;
}

export interface IUserLoginError {
    type: typeof USER_LOGIN_ERROR;
}

export type AuthAction = IUserLoginRequest | IUserLoginSuccess | IUserLoginError;

const userLoginRequest = () : IUserLoginRequest => {
    return {
        type: USER_LOGIN_REQUEST
    }
}

const userLoginSuccess = (token : string) : IUserLoginSuccess => {
    return {
        type : USER_LOGIN_SUCCESS,
        payload: token
    }
}

const userLoginError = () : IUserLoginError => {
    return {
        type : USER_LOGIN_ERROR
    }
}

export const userLogin = (payload : LoginData) : any => async (dispatch : AppDispatch) => {
    
    dispatch(userLoginRequest());

    try {
        let data = await userLoginAPI(payload);

        if(data){
            dispatch(userLoginSuccess(data));
        }
    }
    catch (err) {
        dispatch(userLoginError());
    }
}