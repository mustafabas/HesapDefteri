import axios from 'axios'
import {WATER_PRODUCT_ADD} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_ADD_SUCCEED,PRODUCT_ADD_FAILED, PRODUCT_ADD_LOADING} from './../types'
import {Action} from '../states'
import { reset } from './loginAction';
import {AsyncStorage } from 'react-native'

import { GetProducts } from './productAction';


export function productAddAction(productName:string, productCode:string, price:string, productCount:number) {

  return (dispatch : any) =>  {
    dispatch(productAddLoading(true));
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1]; 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.post(WATER_PRODUCT_ADD,
      {
          productName: productName,
          productCode: productCode,
          price: price,
          productCount:productCount,
          photoPath:"",
          userId : userId
      },{headers: headers})
      .then((response) =>{
        if(response.data.isSuccess){
            if(response.data.result){
              dispatch(productAddIsSucceed(true, "Ürün Oluşturuldu!"));
              dispatch(reset());
              dispatch(GetProducts())
             
            }
          }else {
            dispatch(productAddIsSucceed(false,"Bir hata oluştu."));
          dispatch(reset());
          }
        })
        .catch(error => { 
          dispatch(productAddIsSucceed(false,"Bir hata oluştu."));
          dispatch(reset());
      
        });
  });

  }
}

  
  export const productAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? PRODUCT_ADD_SUCCEED : PRODUCT_ADD_FAILED,
    payload : message
  })
  export const productAddLoading = (val : boolean) => ({
    type :PRODUCT_ADD_LOADING,
    payload : val
  })