import axios from 'axios'
import {WATER_CUSTOMER_DEFINED_PRICE} from '../constants'
import { Dispatch } from "react";
import {CUSTOMER_DEFINED_PRICE_GET,CUSTOMER_DEFINED_PRICE_LOADING } from '../types'
import {Action} from '../states'
import { IDefinedCustomerPriceItem } from "../models/customerDefinedPriceModel";
import {AsyncStorage } from 'react-native'



export function getCustomerPrice(customerId:number) {

 
  return (dispatch : Dispatch<Action>) =>  {
    dispatch(loading(true));

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  

    
    var WATER_CUSTOMER_DEFINED_PRICE_WITH_CUSTOMERID= WATER_CUSTOMER_DEFINED_PRICE+customerId;

  axios.get(WATER_CUSTOMER_DEFINED_PRICE_WITH_CUSTOMERID,
    
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var productModel :IDefinedCustomerPriceItem[] = [];
      
      response.data.result.forEach((product:any) => {
            var productItem : IDefinedCustomerPriceItem={
              customerPriceId:product.customerPriceId,
              productId:product.productId,
              customerId:product.customerId,
              productName:product.productName,
              unitPrice:product.unitPrice,
              displayUnitPrice:product.displayUnitPrice,
            }
            productModel.push(productItem);         
      });
   
      dispatch(products(productModel));
      
    }
   
  
  else {

  }
  })
  .catch((err) => {
    // dispatch(loading(false));

  });


  })

  
  
   


  }

}


export const loading = (loader : boolean) => ({
    type : CUSTOMER_DEFINED_PRICE_LOADING,
    payload : loader
  })

  export const products = (products :IDefinedCustomerPriceItem[] ) => ({
    type : CUSTOMER_DEFINED_PRICE_GET,
    payload : products
  })

  