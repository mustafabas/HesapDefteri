import axios from 'axios'
import {WATER_CUSTOMER_EDIT, WATER_CUSTOMER_GETBY_ID} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_EDIT_FAILED,CUSTOMER_EDIT_SUCCEED, CUSTOMER_EDIT_LOADING, CUSTOMER_GETBY_ID_LOADING, CUSTOMER_GETBY_ID,} from './../types'
import {Action} from '../states'
import Axios from 'axios';
import {AsyncStorage } from 'react-native'

import { reset } from './loginAction';
import { GetCustomers } from './homeAction';


export interface Customer {
  customerId: number;
  nameSurname: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  fountainCount: string;
  dayOfWeeks: string;
}


export function getCustomerInfo(customerId : number) {
  return (dispatch : Dispatch<Action>) => {
    dispatch(getCustomerLoading(true))

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    var customer = {} as Customer;

    axios.get(WATER_CUSTOMER_GETBY_ID + `?customerId=${customerId}`,{
      headers : headers
     }) .then((response) =>{
      if(response.data.isSuccess){
          let data = response.data.result.getCustomerByIdResponseModels[0]
          customer.address = data.address
          customer.companyName = data.companyName
          customer.customerId = data.customerId
          customer.dayOfWeeks = data.dayOfWeeks
          customer.fountainCount = data.fountainCount
          customer.nameSurname = data.nameSurname
          customer.phoneNumber = data.phoneNumber

          dispatch(getCustomer(customer))
          dispatch(getCustomerLoading(false))
        }
      })
      .catch(error => {      

        dispatch(getCustomerLoading(false))
      });

  }).catch(err => {
    dispatch(getCustomerLoading(false))
  })

  }
}
export function customerEdit(id:number, nameSurname:string,  companyName:string,dayOfWeek :number,fountainCount:number,dayOfWeeks:string,adress : string,phoneNumber : string) {
  return (dispatch :any) =>  {





    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }


    axios.post(WATER_CUSTOMER_EDIT,
      {
          id: id,
          nameSurname: nameSurname,
          companyName: companyName,
          dayOfWeek :dayOfWeek,
          fountainCount:fountainCount,
          dayOfWeeks: dayOfWeeks,
          userId : userId,
          address: adress,
          phoneNumber :phoneNumber
      },{
        headers: headers
      })
    .then((response) =>{
    if(response.data.isSuccess){
        if(response.data.result){
          dispatch(customerEditIsSucceed(true, "Müşteri Düzenlendi!"));
      
          dispatch(GetCustomers(1, "", 0, 1))
          dispatch(reset())
        }
      }
    })
    .catch(error => {       
      dispatch(customerEditIsSucceed(false,"Bir hata oluştu."));
      dispatch(reset());

    });


  }).catch(err=> {

  })
 
  }
}

  
  export const customerEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_EDIT_SUCCEED : CUSTOMER_EDIT_FAILED,
    payload : message
  })
  

  export const getCustomer = (customer : Customer) => ({
    type : CUSTOMER_GETBY_ID,
    payload : customer
  })


  export const getCustomerLoading  = (bool : boolean) => ({
    type : CUSTOMER_GETBY_ID_LOADING,
    payload : bool
  })


// CUSTOMER_EDIT_LOADING



