import axios from 'axios'
import { WATER_GET_USER,WATER_GET_ABOUT_US } from './../constants'
import { Dispatch } from "react";
import { USER_GET, USER_LOADING } from './../types'
import { Action } from '../states'
import { IGetUserItem } from "../models/userModel";
import { reset } from './loginAction';




    





export function GetUser(employeeId: number) {

    return (dispatch: Dispatch<Action>) => {

        dispatch(loading(true));
        var WATER_GET_USER_WITH_EMPLOYEEID = WATER_GET_USER + employeeId;

        axios.get(WATER_GET_USER_WITH_EMPLOYEEID,

        )
            .then((response) => {
                if (response.data.isSuccess) {
                    var userModel: IGetUserItem = {
                        userId: response.data.result.userId,
                        nameSurname: response.data.result.nameSurname,
                        email: response.data.result.email,
                        password: response.data.result.password,
                        active: response.data.result.active,
                    };
                    dispatch(user(userModel));
                }
                else {

                }
            })
            .catch((err) => {
                // dispatch(loading(false));

            });


    }

}


export const loading = (loader: boolean) => ({
    type: USER_LOADING,
    payload: loader
})

export const user = (user: IGetUserItem) => ({
    type: USER_GET,
    payload: user
})

