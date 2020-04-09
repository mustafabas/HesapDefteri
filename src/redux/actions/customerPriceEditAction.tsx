import axios from 'axios'
import {WATER_CUSTOMER_PRICE_EDIT} from '../constants'
import { Dispatch } from "react";
import {CUSTOMERPRICE_EDIT_SUCCEED,CUSTOMERPRICE_EDIT_FAILED} from '../types'
import {Action} from '../states'
import { getCustomerPrice } from './customerDefinedPriceAction';


export function customerPriceEdit(price:number, customerPriceId:number,customerId : number) {

  return (dispatch : any) =>  {

  axios.post(WATER_CUSTOMER_PRICE_EDIT,
    {
        price: price,
        customerPriceId: customerPriceId,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerPriceEditIsSucceed(true, "Müşteriye Özel Ürün Fiyatı Düzenlendi!"));
        dispatch(getCustomerPrice(customerId))
      }
    }
  })
  .catch(error => {     
    dispatch(customerPriceEditIsSucceed(false,"Bir hata oluştu."));
  });
  }
}

  
  export const customerPriceEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMERPRICE_EDIT_SUCCEED : CUSTOMERPRICE_EDIT_FAILED,
    payload : message
  })
  