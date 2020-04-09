import axios from 'axios'
import {WATER_GET_PRODUCT} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_GET,PRODUCT_LOADING } from './../types'
import {Action} from '../states'
import { IProductItem } from "../models/productModel";
import {AsyncStorage } from 'react-native'



export function GetProducts() {

  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));


    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.get(WATER_GET_PRODUCT+"?userId="+userId,
    
      {headers: headers })
    .then((response) =>{
      
    if(response.data.isSuccess){
        var productModel :IProductItem[] = [];
        
        response.data.result.homeProductItemModels.forEach((product:any) => {
              var productItem : IProductItem={
                  productId :product.productId,
                  productName : product.productName,
                  productCode :product.productCode,
                  price :product.price,
                  productStatus: product.productStatus,
              }
              productModel.push(productItem);         
        });
     
        dispatch(products(productModel));
        dispatch(loading(false));
      }
     
    
    else {
      dispatch(loading(false));
    }
    })
    .catch((err) => {
      dispatch(loading(false));
    });
  
  }).catch(err => {
    dispatch(loading(false));
  })


 

  }

}


export const loading = (loader : boolean) => ({
    type : PRODUCT_LOADING,
    payload : loader
  })

  export const products = (products :IProductItem[] ) => ({
    type : PRODUCT_GET,
    payload : products
  })

  