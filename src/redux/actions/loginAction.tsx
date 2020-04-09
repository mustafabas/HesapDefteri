import {AsyncStorage } from 'react-native'

import axios from 'axios'
import {WATER_USER_LOGIN} from './../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED,RESET_PROPS} from './../types'
import {Action} from '../states'
import { navigate } from "../services/Navigator";


export function loginUserService(username:string, password:string) {

  return (dispatch : Dispatch<Action>) =>  {
    console.log(username + password)

    dispatch(loading(true));

  axios.post(WATER_USER_LOGIN,
    {
        username: username,
        password: password,
    })
  .then((response) =>{

  if(response.data.isSuccess){
      console.log(response.data.result.userId)

    AsyncStorage.setItem("userToken", response.data.result.token)
    .then(() => {   
  
      AsyncStorage.setItem("userId", response.data.result.userId.toString()).then(()=>{
        AsyncStorage.setItem("UserType",response.data.result.userType.toString()).then(()=>{
          dispatch(loginIsSucceed(true,"")); 
          dispatch(reset());
        });
       
      })
    })
    .catch(error => { 
      console.log(error)
      dispatch(loginIsSucceed(false,error));
      dispatch(reset());
    });
    }

   
  
  else {
    if(response.data.message == "User.Login.UserNotFound"){
      dispatch(loginIsSucceed(false,"Böyle bir kullanıcı bulunamadı!")); 
      dispatch(reset());
    }
  }
  })
  .catch((err) => {
    dispatch(loginIsSucceed(false,err));
    // dispatch(reset());
    dispatch(reset());

  });

 
  }

}


export function logOut() {
  return (dispatch : Dispatch<Action>) =>  { 

    AsyncStorage.multiRemove(["userToken","userId"])
    .then(() => {
      navigate('AuthLoading',{})

     }).catch(err => {

     })

  }
}
export function logoutUserService() {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiRemove(["userToken","userId"])
        .then(() => {
         
          resolve();

        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  
  export const loading = (loader : boolean) => ({
    type : LOGIN_STARTED,
    payload : loader
  })
  
  
  export const loginIsSucceed = (loginIsSucced : boolean, message:string) => ({
    type : loginIsSucced ? LOGIN_SUCCEED : LOGIN_FAILED,
    payload : message
  })
  

  
  
  export const reset = () => ({
    type : RESET_PROPS,
    payload:null
  })