import axios from 'axios'
import {WATER_EDIT_PRODUCT, WATER_GET_PRODUCT_BY_ID} from './../constants'
import { Dispatch } from "react";
import {EDIT_PRODUCT_SUCCEED,EDIT_PRODUCT_FAILED, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_LOADING, EDIT_PRODUCT_LOADING} from './../types'
import {Action} from '../states'
import {AsyncStorage } from 'react-native'

import { reset } from './loginAction';
import { GetProducts } from './productAction';


export interface IProduct {
  productName: string;
  storeId: number;
  productCode: number;
  price: number;
  status: number;
  productCount: number;
  photoPath: string;
  active: boolean;
}

export function getProductById(productId : number) {
  return(dispatch : Dispatch < Action> ) => {
dispatch(getProductLoading())
   var product = {} as IProduct

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];

      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`



    }
    console.log(productId)
    axios.get(WATER_GET_PRODUCT_BY_ID + `?productId=${productId}` ,{
      headers: headers
    }).then((res) => {
      if(res.data.isSuccess){
        let data = res.data.result
        product.active = data.active
        product.photoPath = data.photoPath
        product.price = data.price
        product.productCode = data.productCode
        product.productCount = data.productCount
        product.productName = data.productName
        product.status = data.status
        product.storeId = data.storeId
console.log(product)
        dispatch(getProduct(product))
     
      }
      else {
console.log("asd")
      }
    }).catch(err=> {
      console.log("asd")
    })

  }).catch(err=> {

  })

  }
}

export function productEdit(id:number, status:boolean, productName:string,productCode:string,price:number,productCount : number) {

  return (dispatch : any) =>  {
    console.log(id + "id" + "status" +status)

dispatch(editProductLoading())


console.log("asd"+productCount)


AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {

  let userId = res[1][1];
  let token = res[0][1];

  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`



}
console.log(userId + "id")
axios.post(WATER_EDIT_PRODUCT,
  {
      id: id,
      active: status,
      productName : productName,
      productCode :productCode,
      price :price, 
      productCount: productCount,
      userId: userId
  },{
    headers : headers
  })
.then((response) =>{
if(response.data.isSuccess){
    if(response.data.result){
      dispatch(productEditIsSucceed(true, "Ürün Düzenlendi!"));
      dispatch(reset());
      dispatch(GetProducts())
    }
  }
})
.catch(error => {      
  dispatch(productEditIsSucceed(false,"Bir hata oluştu."));
  dispatch(reset());
});

})
  
  }
}

  
  export const productEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EDIT_PRODUCT_SUCCEED : EDIT_PRODUCT_FAILED,
    payload : message
  })
  

  export const getProduct = (product : IProduct) => ({
    type : GET_PRODUCT_BY_ID,
    
    payload : product
  }) 


  export const getProductLoading =  () => ({
    type : GET_PRODUCT_BY_ID_LOADING,
    payload : null,
  })


  export const editProductLoading =  () => ({
    type : EDIT_PRODUCT_LOADING,
    payload : null,
  })

