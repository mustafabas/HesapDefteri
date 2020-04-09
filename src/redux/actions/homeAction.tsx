import {AsyncStorage } from 'react-native'

import axios from 'axios'
import { WATER_CUSTOMERS_HOME_GET, WATER_CUSTOMER_CALL_DETECT, WATER_CUSTOMER_CALL_DETECT_NEW, WATER_CUSTOMERS_HOME_GET_NEW } from './../constants'
import { Dispatch } from "react";
import { CUSTOMER_GET, HOME_LOADING_CUSTOMERS, CUSTOMER_GET_MORE, CUSTOMER_GET_MORE_LOADING, DETECT_USER_FROM_CALL, DETECT_USER_FROM_CALL_LOADING } from './../types'
import { Action } from '../states'
import { ICustomerItem, ICustomerFromPhone } from "../models/homeModel";


export function GetCustomers(orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) {

  return (dispatch: Dispatch<Action>) => {

    dispatch(loading(true));

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    var WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT = WATER_CUSTOMERS_HOME_GET_NEW + orderType + "&searchText=" + searchText + "&pageIndex=" + pageIndex + "&pageSize=15&dayOfWeek=" + dayOfWeek + `&userId=${userId}`;
console.log(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT)
    axios.get(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT,{
      headers: headers 
    }

    )
      .then((response) => {

        if (response.data.isSuccess) {
          var customersModel: ICustomerItem[] = [];
          var totalRecords = response.data.result.totalRecords
console.log("Girdi")
          response.data.result.homeCustomerItemModels.forEach((customer: any) => {
            var customerItem: ICustomerItem = {
              customerId: customer.customerId,
              companyName: customer.companyName,
              nameSurname: customer.nameSurname,
              displayTotalAmount: customer.displayTotalAmount,
              totalAmount: customer.totalAmount,
              displayRestTotalAmount: customer.displayRestTotalAmount,
              restTotalAmount: customer.restTotalAmount,
              displayTookTotalAmount: customer.displayTookTotalAmount,
              dayOfWeek: customer.dayOfWeek,
              fountainCount: customer.fountainCount,
              dayOfWeeks: customer.dayOfWeeks,
            }
            customersModel.push(customerItem);
          });

          dispatch(customers(customersModel,totalRecords));
          dispatch(loading(false));
        }


        else {
          console.log("Girdime")
          dispatch(loading(false));
        }
      })
      .catch((err) => {
        console.log("Girdime")
        dispatch(loading(false));

      });


  })

   
  }

}

export function GetCustomerMore(orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(customerGetMoreLoading(true));

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    var WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT = WATER_CUSTOMERS_HOME_GET_NEW + orderType + "&searchText=" + searchText + "&pageIndex=" + pageIndex + "&pageSize=10&dayOfWeek=" + dayOfWeek+"&userId="+userId;

    console.log(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT);
    axios.get(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT,
      {    headers: headers
       }

    )
      .then(async (response) => {

        if (response.data.isSuccess) {
          var customersModel: ICustomerItem[] = [];

          await response.data.result.homeCustomerItemModels.forEach((customer: any) => {
            var customerItem: ICustomerItem = {
              customerId: customer.customerId,
              companyName: customer.companyName,
              nameSurname: customer.nameSurname,
              displayTotalAmount: customer.displayTotalAmount,
              totalAmount: customer.totalAmount,
              displayRestTotalAmount: customer.displayRestTotalAmount,
              restTotalAmount: customer.restTotalAmount,
              displayTookTotalAmount: customer.displayTookTotalAmount,
              dayOfWeek: customer.dayOfWeek,
              fountainCount: customer.fountainCount,
              dayOfWeeks: customer.dayOfWeeks,
            }
            customersModel.push(customerItem);
          });
     
          dispatch(customersMore(customersModel));

        }


        else {
          dispatch(customerGetMoreLoading(false));

        }
      })
      .catch((err) => {
        // dispatch(loading(false));
        // console.log(err);

        dispatch(customerGetMoreLoading(false));

      });
 

  })
  }
}


export function detectUserFromCall(phoneNumber : string) {
  phoneNumber = phoneNumber.replace("+", "")
  

  return (dispatch: Dispatch<Action>) => {

    dispatch(loadingFromCall(true));
    console.log(phoneNumber);

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }



    axios.get(WATER_CUSTOMER_CALL_DETECT_NEW + `?userId=${userId}&phoneNumber=${phoneNumber}`,{
      headers: headers 
    }

    )
      .then((response) => {
          console.log(response,"responsecall")
        if (response.data.isSuccess && response.data.result) {
          let custmer = response.data.result
          let customer : ICustomerFromPhone = {
            customerName:custmer.customerName,
            id:custmer.id,
            detected:true
          }


          dispatch(detectUserCall(customer))
        }


        else {
          let customer : ICustomerFromPhone = {
            customerName:'',
            id:0,
            detected:false
          }
          dispatch(detectUserCall(customer))
          dispatch(loadingFromCall(false));
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(loadingFromCall(false));

      });


  })

   
  }

}

export const loadingFromCall = (loading : boolean) => ({
  type : DETECT_USER_FROM_CALL_LOADING,
  payload : loading
})

export const detectUserCall = (customr : ICustomerFromPhone | null) => ({
  type : DETECT_USER_FROM_CALL,
  payload : customr
})



export const loading = (loader: boolean) => ({
  type: HOME_LOADING_CUSTOMERS,
  payload: loader
})

export const customers = (customers: ICustomerItem[],totalRecords : number) => ({
  type: CUSTOMER_GET,
  payload: [customers,totalRecords]
})
export const customersMore = (customers: ICustomerItem[]) => ({
  type: CUSTOMER_GET_MORE,
  payload: customers
})

export const customerGetMoreLoading = (loading : boolean) => ({
  type : CUSTOMER_GET_MORE_LOADING,
  payload: loading
})


