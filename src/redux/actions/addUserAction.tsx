import axios from 'axios'
import {WATER_ADD_USER} from './../constants'
import { Dispatch } from "react";
import {ADD_USER_SUCCEED,ADD_USER_FAILED} from './../types'
import {Action} from '../states'


export function AddUser(nameSurname:string, mail:string,password:string) {
  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_USER,
    {
        nameSurname: nameSurname,
        mail: mail,
        password: password,
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
  