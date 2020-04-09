import axios from 'axios'
import {WATER_ADD_USER} from './../constants'
import { Dispatch } from "react";
import {ADD_USER_SUCCEED,ADD_USER_FAILED} from './../types'
import {Action} from '../states'

export interface User {
    nameSurname : string;
    email : string;
    password : string;
    phoneNumber : string;
    companyName : string ;
    adress : string;

}


export function createUser(user : User) {
  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_USER,
    {
        nameSurname: user.nameSurname,
        mail: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        companyName : user.companyName,
        adress : user.adress,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(addUser(true, "Kullanıcı Eklendi!"));
      }
    }
  })
  .catch(error => {  
    dispatch(addUser(false,"Kullanıcı Eklenirken bir hata oluştuuu."));
  });

  }

}

  
  export const addUser = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ADD_USER_SUCCEED : ADD_USER_FAILED,
    payload : message
  })
  