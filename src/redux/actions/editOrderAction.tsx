import axios from 'axios'
import {WATER_CUSTOMER_ORDER_UPDATE} from './../constants'
import { Dispatch } from "react";
import {UPDATE_ORDER_SUCCEED,UPDATE_ORDER_FAILED} from './../types'
import {Action} from '../states'


export function EditOrder(orderId:number,productId:number, customerId:number,unitPrice:number, count:number,isPaid:boolean) {
  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_CUSTOMER_ORDER_UPDATE,
    {
        id: orderId,
        productId: productId,
        customerId: customerId,
        unitPrice: unitPrice,
        count: count,
        isPaid:isPaid,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(addOrder(true, "Sipariş Düzenlendi!"));
      }
    }
  })
  .catch(error => { 
  });

  }

}

  
  export const addOrder = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? UPDATE_ORDER_SUCCEED : UPDATE_ORDER_FAILED,
    payload : message
  })
  