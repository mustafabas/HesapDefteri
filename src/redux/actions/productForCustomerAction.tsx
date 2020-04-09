import {AsyncStorage } from 'react-native'

import axios from 'axios'
import {WATER_PRODUCT_FOR_CUSTOMER} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_FOR_CUSTOMER_GET,PRODUCT_FOR_CUSTOMER_LOADING } from './../types'
import {Action} from '../states'
import { IProductForCustomerItem } from "../models/productForCustomerModel";
import { reset } from "./loginAction";

export function resetProduct(){
  return (dispatch : Dispatch<Action>) =>  {
    dispatch(reset())
  }

}


export function GetProduct(productId:number,customerId:number) {

  return (dispatch : any) =>  {

    AsyncStorage.getItem("userToken").then((res) => {
      let userToken = res
      var WATER_PRODUCT_FOR_CUSTOMER_WITH_PROID_CUSID = WATER_PRODUCT_FOR_CUSTOMER+productId+"&customerId="+customerId;
      console.log(WATER_PRODUCT_FOR_CUSTOMER_WITH_PROID_CUSID)
      dispatch(loading(true));
  
   
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
    }

    axios.get(WATER_PRODUCT_FOR_CUSTOMER_WITH_PROID_CUSID,{
      headers: headers
    }
      
      )
    .then((response) =>{
      
    if(response.data.isSuccess){
        var productModel : IProductForCustomerItem={
          productId:response.data.result.productId,
          productName:response.data.result.productName,
          unitPrice:response.data.result.unitPrice,
          productCode:response.data.result.productCode,
        }
        dispatch(products(productModel));
        dispatch(resetProduct())
      }
     
    
    else {
      console.log("Hata")
      dispatch(loading(false))
    }
    })
    .catch((err) => {
      console.log(err)
      dispatch(loading(false));
    });

    })
    
  }
}
export const loading = (loader : boolean) => ({
    type : PRODUCT_FOR_CUSTOMER_LOADING,
    payload : loader,
  })

  export const products = (product :IProductForCustomerItem) => ({
    type : PRODUCT_FOR_CUSTOMER_GET,
    payload : product,
  })


  export const resetNew = () => ({
    type : "reset",
    payload : null
  })
  