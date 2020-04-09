import axios from 'axios'
import {WATER_ADD_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_ADD_SUCCEED,EMPLOYEE_ADD_FAILED, EMPLOYEE_ADD_LOADING} from './../types'
import {Action} from '../states'
import {AsyncStorage } from 'react-native'
import { reset } from './loginAction';
import { GetEmployees } from './employeeAction';

export function employeeAdd(nameSurname:string, monthlySalary:number,email:string,password:string, phoneNumber:string, identityNumber:string, address:string, dailyPriceFood:number) {

  return (dispatch : any) =>  {
    dispatch(employeLoading(true));
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1]; 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    console.log("User Id : " + userId )
    console.log("Token Id : " + token )
    axios.post(WATER_ADD_EMPLOYEE,
      {
          nameSurname: nameSurname,
          monthlySalary: monthlySalary,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          identityNumber: identityNumber,
          address: address,
          dailyFoodPrice: dailyPriceFood,
          userId:userId,
          
      },{
        headers: headers 
      })
    .then((response) =>{
      console.log(response);
    if(response.data.isSuccess){
  
        if(response.data.result){
          dispatch(employeAddIsSucceed(true, "Çalışan Eklendi!"));
          dispatch(reset());
          dispatch(GetEmployees());
         }
      }  else {
        //  hata mesaji dondur mail icin
         if(response.data.result.message == "Employee.Post.EmailFoundedAnother") {
          dispatch(employeAddIsSucceed(false,"Böyle bir email sistemde kayıtlı. Lütfen farklı bir email deneyiniz."));
          dispatch(reset());
         }
       }
    })
    .catch(error => { 
      console.log(error);
      dispatch(employeAddIsSucceed(false,"Çalışan Eklenirken bir hata oluştu."));
      dispatch(reset());
    });
  });
  }
}

  
  export const employeAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_ADD_SUCCEED : EMPLOYEE_ADD_FAILED,
    payload : message
  })
  
  
  export const employeLoading = (val : boolean) => ({
    type :  EMPLOYEE_ADD_LOADING,
    payload : val
  })
  