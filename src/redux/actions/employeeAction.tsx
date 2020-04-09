import {AsyncStorage } from 'react-native'

import axios from 'axios'
import { WATER_EMPLOYEE_GET } from './../constants'
import { Dispatch } from "react";
import { EMPLOYEE_GET, LOADING_EMPLOYEES } from './../types'
import { Action } from '../states'
import { IEmployeeItem, IEmployeeItemResponseModel } from "../models/employeeModel";
import { employe } from "./editEmployeeAction";


export function GetEmployees() {

    return (dispatch: Dispatch<Action>) => {
        dispatch(loading(true));
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1]; 
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          axios.get(WATER_EMPLOYEE_GET+`?userId=${userId}`,
            )
                .then((response) => {
    
                    if (response.data.isSuccess) {
                        var employeesModel: IEmployeeItemResponseModel[] = [];
    
                        response.data.result.forEach((employee: any) => {
                            var employeeItem: IEmployeeItemResponseModel = {
                                employeeId: employee.employeeId,
                                employeeName: employee.employeeName,
                                monthlySalaryDisplay: employee.monthlySalaryDisplay,
                                createDate: employee.createDate,
                                active: employee.active,
                                addAsUser:employee.addAsUser,
                                address:employee.address,
                                dailyDecimalFoodDisplay:employee.dailyDecimalFoodDisplay,
                                phoneNumber:employee.phoneNumber,
                                fullShow:false

                            }
                            employeesModel.push(employeeItem);
                        });
    
                        dispatch(employees(employeesModel));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        });

        
    
    }
}


export const loading = (loader: boolean) => ({
    type: LOADING_EMPLOYEES,
    payload: loader
})

export const employees = (employees: IEmployeeItemResponseModel[]) => ({
    type: EMPLOYEE_GET,
    payload: employees
})

