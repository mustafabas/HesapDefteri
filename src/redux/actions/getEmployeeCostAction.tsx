import axios from 'axios'
import { WATER_GETEMPLOYEECOST } from '../constants'
import { Dispatch } from "react";
import { EMPLOYEECOST_GET, EMPLOYEECOST_LOADING } from '../types'
import { Action } from '../states'
import { IEmployeeCostItem } from "../models/employeeCostModel";
import {AsyncStorage } from 'react-native'


export function GetEmployeeCost() {

    return (dispatch: Dispatch<Action>) => {

        dispatch(loading(true));

        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1]; 
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          axios.get(WATER_GETEMPLOYEECOST+"?userId="+userId,
            )
                .then((response) => {
                    if (response.data.isSuccess) {
                        var employeeCostModel: IEmployeeCostItem[] = [];
    
                        response.data.result.homeEmployeeCostItemModels.forEach((employeeCost: any) => {
                            var employeeCostItem: IEmployeeCostItem = {
                                cost: employeeCost.cost,
                                employeId: employeeCost.employeId,
                                employeName: employeeCost.employeName,
                                createdDate: employeeCost.createdDate,
                                id: employeeCost.id,
                            }
                            employeeCostModel.push(employeeCostItem);
                        });
                    console.log(employeeCostModel);
                        dispatch(employeeCost(employeeCostModel));
                    }
                })
                .catch((err) => {
                    // dispatch(loading(false));
    
                });
    
    
        });
    }
}


export const loading = (loader: boolean) => ({
    type: EMPLOYEECOST_LOADING,
    payload: loader
})

export const employeeCost = (user: IEmployeeCostItem[]) => ({
    type: EMPLOYEECOST_GET,
    payload: user
})

