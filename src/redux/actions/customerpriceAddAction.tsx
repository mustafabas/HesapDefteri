import axios from 'axios'
import {WATER_CUSTOMER_PRICE_ADD} from './../constants'
import { Dispatch } from "react";
import {CUSTOMERPRICE_ADD_SUCCEED,CUSTOMERPRICE_ADD_FAILED} from './../types'
import {Action} from '../states'
import { reset } from './loginAction';
import {AsyncStorage } from 'react-native'



export function customerPriceAdd(productId:number, customerId:number, price:number) {

  return (dispatch : Dispatch<Action>) =>  {


AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
  let token = res[0][1];
  let userId = res[1][1];
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}
axios.post(WATER_CUSTOMER_PRICE_ADD,
  {
      productId: productId,
      customerId: customerId,
      price:price,
  })
.then((response) =>{
if(response.data.isSuccess){
    if(response.data.result){
      dispatch(customerPriceAddIsSucceed(true, "Yeni Fiyat Başarıyla Girildi!"));
      dispatch(reset())
    }
  }
})
.catch(error => {  

  dispatch(customerPriceAddIsSucceed(false,"Bir hata oluştu."));
  dispatch(reset())
});

}).catch(err=>{
  dispatch(customerPriceAddIsSucceed(false,"Bir hata oluştu."));
  dispatch(reset())
})
  
  }

}

  
  export const customerPriceAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMERPRICE_ADD_SUCCEED : CUSTOMERPRICE_ADD_FAILED,
    payload : message
  })
  
