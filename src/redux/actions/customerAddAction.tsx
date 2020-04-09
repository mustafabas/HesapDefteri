import axios from 'axios'
import { WATER_CUSTOMER_ADD, WATER_CUSTOMER_ADD_NEW } from './../constants'
import { Dispatch } from "react";
import { CUSTOMER_ADD_SUCCEED, CUSTOMER_ADD_FAILED, CUSTOMER_ADD_LOADING } from './../types'
import { Action } from '../states'
import { Alert } from 'react-native';
import {AsyncStorage } from 'react-native'
import { reset } from './signUpActions';
import {axiosBase} from '../services/HeaderConfig'
import { GetCustomers } from './homeAction';

export function customerAdd(nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: string, dayOfWeeks: string,address:string,phoneNumber:string) {



  return async (dispatch: any) => {

    dispatch(customerAddIsLoading(true))

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

      axios.post(WATER_CUSTOMER_ADD_NEW,
        {
          nameSurname: nameSurname,
          companyName: companyName,
          dayOfWeek: 0,
          fountainCount: +fountainCount,
          dayOfWeeks: dayOfWeeks, 
          userId: userId,
          address: address,
          phoneNumber:phoneNumber 
  
        },{ headers: headers })
        .then((response) => {
          if (response.data.isSuccess) {
            if (response.data.result) {
            
              dispatch(customerAddIsSucceed(true, "Müşteri Eklendi!"));
              dispatch(reset());
              dispatch(GetCustomers(1,"",0,1));
            }
  
          }
          else {

            if(response.data.message === "Customer.Post.StoreCannotAddMoreThan5Customers"){
              dispatch(customerAddIsSucceed(false, "Limitli pakete sahip üyelerimiz tanımlanandan fazla müşteri ekleyememektedir. Lütfen destek sayfamızdan bizimle iletişime geçiniz"));
            }
            else {
              dispatch(customerAddIsSucceed(false, "Kayıtlı Müşteri Var."));
          
            }
            
            dispatch(reset())
            dispatch(GetCustomers(1,"",0,1));
          }
        })
        .catch(error => {

          dispatch(customerAddIsSucceed(false, "Bir hata oluştu."));
          dispatch(reset())
        });
  
    })


  }

}


export const customerAddIsSucceed = (isSuccess: boolean, message: string) => ({
  type: isSuccess ? CUSTOMER_ADD_SUCCEED : CUSTOMER_ADD_FAILED,
  payload: message
})


export const customerAddIsLoading = (loading: boolean) => ({
  type: CUSTOMER_ADD_LOADING,
  payload: loading
})

