import axios from 'axios'
import {WATER_CUSTOMER_DELETE} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_DELETE_SUCCEED,CUSTOMER_DELETE_FAILED, CUSTOMER_DELETE_LOADING} from './../types'
import {Action} from '../states'
import { GetCustomers } from './homeAction';
import {AsyncStorage } from 'react-native'

import { reset } from './loginAction';


export  function  customerDelete(id:number) {

  return (dispatch : any) =>  {
    dispatch(customerDeleteLoading(true));


    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.post(WATER_CUSTOMER_DELETE,
      {
          id: id,
      },{
        headers: headers
      })
    .then((response) =>{
    if(response.data.isSuccess){
        if(response.data.result){
          dispatch(customerDeleteIsSucceed(true, "Müşteri Silindi!"));
          dispatch(customerDeleteLoading(false));
          dispatch(GetCustomers(1,"",0,1))
          dispatch(reset())
            
  
        }
      }
    })
    .catch(error => { 
      dispatch(customerDeleteIsSucceed(false,"Bir hata oluştu."));
      dispatch(customerDeleteLoading(false));
      dispatch(reset())
    });

  }).catch(err=> {
    dispatch(customerDeleteIsSucceed(false,"Bir hata oluştu."));
      dispatch(customerDeleteLoading(false));
    dispatch(reset())
  })

  

  }

}

  
  export const customerDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_DELETE_SUCCEED : CUSTOMER_DELETE_FAILED,
    payload : message
  })
  export const customerDeleteLoading = (isSuccess : boolean) => ({
    type : CUSTOMER_DELETE_LOADING,
    payload : isSuccess
  })
  
