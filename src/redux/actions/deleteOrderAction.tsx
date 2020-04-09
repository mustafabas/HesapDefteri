import axios from 'axios'
import {WATER_CUSTOMER_ORDER_DELETE} from './../constants'
import { Dispatch } from "react";
import {ORDER_DELETE_SUCCEED,ORDER_DELETE_FAILED} from './../types'
import {Action} from '../states'
import {AsyncStorage } from 'react-native'

import { GetOrders } from './orderAction';
import { reset } from './loginAction';


export function orderDelete(customerId : number,id:number) {

  return (dispatch : any) =>  {

    AsyncStorage.getItem('userToken').then((res) => {
      let token = res;

      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.post(WATER_CUSTOMER_ORDER_DELETE,
      {
          id: id,
      },{
        headers:headers
      })
    .then((response) =>{
    if(response.data.isSuccess){
        if(response.data.result){
          dispatch(orderDeleteIsSucceed(true, "Sipariş Silindi!"));
          dispatch(reset())
          dispatch(GetOrders(customerId, 1, 8))
        }
      }
    })
    .catch(error => { 
      dispatch(orderDeleteIsSucceed(false, "Sipariş Silinemedi!"));
      dispatch(reset())

    });

  }).catch((res) => {
    dispatch(orderDeleteIsSucceed(false, "Sipariş Silinemedi!"));
    dispatch(reset())
  })

  

  }

}

  export const orderDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ORDER_DELETE_SUCCEED : ORDER_DELETE_FAILED,
    payload : message
  })
  
