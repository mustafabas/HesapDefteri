import axios from 'axios'
import {WATER_ADD_CASH} from './../constants'
import { Dispatch } from "react";
import {ADD_CASH_SUCCEED,ADD_CASH_FAILED} from './../types'
import {Action} from '../states'

import {AsyncStorage } from 'react-native'

import { GetOrders } from './orderAction';
import { reset } from './loginAction';


export function AddCash(customerId : number,orderId:number, amount:number) {

  return (dispatch : any) =>  {
    AsyncStorage.getItem('userToken').then((res) => {
      let token = res;

      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.post(WATER_ADD_CASH,
      {
          orderId: orderId,
          amount: amount,
      },{
        headers:headers
      })
    .then((response) =>{
    if(response.data.isSuccess){
        if(response.data.result){
          dispatch(addCash(true, "Ödeme Alındı!"));
          dispatch(reset())
          dispatch(GetOrders(customerId, 1, 10))
        }
      }else {

      }
    })
    .catch(error => { 

      dispatch(addCash(false,"Ödeme Alınırken bir hata oluştu."));
      dispatch(reset())
    });

    
  }).catch(err=>{
    dispatch(addCash(false,"Bir Hata Meydana Geldi"));
    dispatch(reset())
  })

    


  }

}

  
  export const addCash = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ADD_CASH_SUCCEED : ADD_CASH_FAILED,
    payload : message
  })
  