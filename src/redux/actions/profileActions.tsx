import axios from 'axios'
import { WATER_GET_USER,WATER_GET_ABOUT_US, WATER_GET_USER_INFO, WATER_UPDATE_USER_INFO_GENERAL, WATER_UPDATE_STORE_INFO, WATER_GET_STORE_INFO, WATER_SUPPORT_SEND_MESSAGE } from './../constants'
import { Dispatch } from "react";
import { USER_GET, USER_LOADING, ABOUT_US_CONTEXT, GET_USER_INFO, GET_USER_INFO_LOADING, GET_USER_INFO_FAILED, ABOUT_US_CONTEXT_LOADING, ABOUT_US_CONTEXT_FAILED, UPDATE_USER_GENERAL, UPDATE_USER_GENERAL_LOADING, UPDATE_USER_GENERAL_FAILED, UPDATE_USER_SECURITY_LOADING, UPDATE_USER_SECURITY_FAILED, UPDATE_USER_SECURITY, GET_STORE_INFO_LOADING, GET_STORE_INFO_FAILED, GET_STORE_INFO, UPADTE_STORE_INFO_LOADING, UPADTE_STORE_INFO_FAILED, UPADTE_STORE_INFO, SEND_SUPPORT_MESSAGE_LOADING, SEND_SUPPORT_MESSAGE_FAILED, SEND_SUPPORT_MESSAGE_SUCCEED } from './../types'
import { Action } from '../states'
import { IGetUserItem } from "../models/userModel";
import { reset } from './loginAction';
import {AsyncStorage } from 'react-native'




export enum userType  {
    companyUser = 1,
    casualUser = 2

} 


export interface UserInfo {
    nameSurname: string;
    email: string;
    password: string;
    oldPassword: string;
    userType : userType;
}


export interface storeInfo {
    storeId : number;
    storeName: string;
    phoneNumber: string;
    address: string;
    active: boolean;
    status: number;
}



export function getStoreInfo() {
    return(dispatch : Dispatch<Action>) => {
        
        dispatch(loadingGetStoreInfo(true,"")) 
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          var store = {} as storeInfo;

          axios.get(WATER_GET_STORE_INFO + '?userId='+ userId,{headers:headers}).then(res => {
              if(res.data.isSuccess) {
                  let data = res.data.result;
                  store.active = data.active;
                  store.address = data.address;
                  store.storeId = data.storeId;
                  store.phoneNumber = data.phoneNumber;
                  store.status = data.status;
                  store.storeName = data.storeName;

                   console.log(store)
                  dispatch(getStore(store))
              }
              else {
                dispatch(loadingGetStoreInfo(false,"Bir Hata Meydana Geldi.")) 
                dispatch(reset())
              }
          }).catch(err => {
            console.log(err)
            dispatch(loadingGetStoreInfo(false,"Bir Hata Meydana Geldi.")) 
            dispatch(reset())
          })


        }).catch(err => {
            dispatch(loadingGetStoreInfo(false,"Bir Hata Meydana Geldi.")) 
            dispatch(reset())
        })

}
}
export function updateStoreInfo(store : storeInfo) {
    return(dispatch : Dispatch<Action>) => {
        
        dispatch(loadingUpdateStoreInfo(true,"")) 
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          console.log(store)
          axios.post(WATER_UPDATE_STORE_INFO, {
            id: store.storeId,
            storeName: store.storeName,
            phoneNumber: store.phoneNumber,
            address: store.address,
            active: store.active,
            status: store.status,
            updatedDate: "2020-01-11T14:21:17.880Z"

          }).then(res => {
              if(res.data.isSuccess) {

                dispatch(updateStore())
                dispatch(reset())
              }else {

                dispatch(loadingUpdateStoreInfo(false,"Bir Hata Meydana Geldi.")) 
                dispatch(reset())
              }
          }).catch(err => {
              console.log(err)
            dispatch(loadingUpdateStoreInfo(false,"Bir Hata Meydana Geldi.")) 
            dispatch(reset())
          })





        }).catch(err => {
            dispatch(loadingUpdateStoreInfo(false,"Bir Hata Meydana Geldi.")) 
        })

}}

export function getUserInfo() {
    return(dispatch : Dispatch<Action>) => {
    
        dispatch(loading(true,"")) 
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
    
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }    
        axios.get(WATER_GET_USER_INFO + "?userId=" + userId).then((response)=> {
            var userInfo = {} as UserInfo

            if(response.data.isSuccess){
              if(response.data.result){
                console.log(response,"response");
                let data = response.data.result.user;
                userInfo.email  = data.email;
                userInfo.nameSurname = data.nameSurname;
                userInfo.oldPassword = data.oldPassword;
                userInfo.password = data.password;
                userInfo.userType = data.userType;
                dispatch(getUserInfoConst(userInfo));
              }

            
            }
            else {
              console.log("data gelmedi");
                dispatch(loading(false,"Bir Hata Meydana Geldi."));
                dispatch(reset());
            }
        }).catch(err=>{
          console.log(err);
            dispatch(loading(false,"Bir Hata Meydana Geldi."));
            dispatch(reset());
        })

    }).catch(err=> {
      console.log(err);
        dispatch(loading(false,"Bir Hata Meydana Geldi."))
        dispatch(reset());
    })
    }
}



    
export function getAboutUs() {
    return (dispatch : Dispatch<Action>) =>  {
        dispatch(loading(true,""))
        axios.get(WATER_GET_ABOUT_US).then((res) => {
            console.log(res)
            if(res.data.isSuccess){
                dispatch(aboutUsContext(res.data.result))


            }else {
            
                dispatch(loading(false,"Bir Hata Meydana Geldi"));
                dispatch(reset());
            }
       
        }).catch(err=> {

            dispatch(loading(false,"Bir hata meydana geldi"));
            dispatch(reset());
        })
    }}
    

    export function editUserSecurityInfo(userGeneral  :UserInfo)  {
        return (dispatch : any) =>  {
            dispatch(loadingUpdateUserGeneral(true,""))
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
            
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }

          axios.post(WATER_UPDATE_USER_INFO_GENERAL, {
            id: userId,
            nameSurname: userGeneral.nameSurname,
            mail: userGeneral.email,
            password: userGeneral.password,
            employeeId: 0
          }).then((res)=> {

            if(res.data.isSuccess){
                        dispatch(updateSecurityInfo("Şifreniz Güncellendi."));
                        dispatch(reset());
                        dispatch(getUserInfo());
                        
            }
            else {
                dispatch(loadingUpdateSecurityInfo(true,"Bir Hata Meydana Geldi"));
                dispatch(reset());
            }
          }).catch(err => {
            dispatch(loadingUpdateSecurityInfo(true,"Bir Hata Meydana Geldi"));
            dispatch(reset());
          })
    

        }).catch(err => {
            dispatch(loadingUpdateSecurityInfo(true,"Bir Hata Meydana Geldi"));
            dispatch(reset());
        })
    }}

    export function editUserInfoGeneral(userGeneral  :UserInfo)  {
        return (dispatch : any) =>  {
            dispatch(loadingUpdateUserGeneral(true,""))
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
        
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          axios.post(WATER_UPDATE_USER_INFO_GENERAL, {
            id: userId,
            nameSurname: userGeneral.nameSurname,
            mail: userGeneral.email,
            password: userGeneral.password,
            employeeId: 0
          }).then((res)=> {

            if(res.data.isSuccess){
                        dispatch(updateUserGeneral("Profiliniz Güncellendi."))
                        dispatch(reset())
                        dispatch(getUserInfo())
            }
            else {
                dispatch(loadingUpdateUserGeneral(true,"Bir Hata Meydana Geldi"))
                dispatch(reset())
            }
          }).catch(err => {
            dispatch(loadingUpdateUserGeneral(true,"Bir Hata Meydana Geldi"))
            dispatch(reset())
          })
    

        }).catch(err => {
            dispatch(loadingUpdateUserGeneral(true,"Bir Hata Meydana Geldi"))
            dispatch(reset())
        })


    }}


    export function sendSupportMessage(subject : string , message : string) {
      return (dispatch : any) =>  {
        dispatch(loadingSupportAction(true,""))
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        let token = res[0][1];
        let userId = res[1][1];
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }

      axios.post(WATER_SUPPORT_SEND_MESSAGE, {
        userId: userId,
        subject: subject,
        message: message
      },{headers : headers}).then(res => {
        if(res.data.isSuccess){
          dispatch(SucceedSupportAction())
          dispatch(reset())
          
}else {
  dispatch(loadingSupportAction(false,"Mesajınız Gönderilmedi Tekrar Deneyiniz!"))
  dispatch(reset())
}
      }).catch(err=> {
        dispatch(loadingSupportAction(false,"Mesajınız Gönderilmedi Tekrar Deneyiniz!"))
        dispatch(reset())
      })
    }).catch(err=> {
      dispatch(loadingSupportAction(false,"Mesajınız Gönderilmedi Tekrar Deneyiniz!"))
      dispatch(reset())
    })

    }}

    export const loadingSupportAction = (loader : boolean, message : string) => ({
      type : loader ? SEND_SUPPORT_MESSAGE_LOADING : SEND_SUPPORT_MESSAGE_FAILED,
      payload : message
    })


    export const SucceedSupportAction = () => ({
      type : SEND_SUPPORT_MESSAGE_SUCCEED,
      payload : null
    })

    export const loadingUpdateSecurityInfo = (loader : boolean,message: string) => ({
        type : loader  ? UPDATE_USER_SECURITY_LOADING : UPDATE_USER_SECURITY_FAILED,
        payload : message
      })

    export const updateSecurityInfo = (message: string) => ({
        type : UPDATE_USER_SECURITY,
        payload: message
    })



    export const loadingUpdateUserGeneral = (loader : boolean,message: string) => ({
        type : loader  ? UPDATE_USER_GENERAL_LOADING : UPDATE_USER_GENERAL_FAILED,
        payload : message
      })

    export const updateUserGeneral = (message: string) => ({
        type : UPDATE_USER_GENERAL,
        payload: message
    })
  
    export const aboutUsContext = (context : string) => ({     
        type: ABOUT_US_CONTEXT,
        payload : context
    
    })


    export const getUserInfoConst = (userInfo : UserInfo) => ({
        type : GET_USER_INFO,
        payload: userInfo
    })


    export const loading = (loader : boolean,message: string) => ({
        type : loader  ? GET_USER_INFO_LOADING : GET_USER_INFO_FAILED,
        payload : message
      })
  
      
      export const AboutUsloading = (loader : boolean,message: string) => ({
        type : loader  ? ABOUT_US_CONTEXT_LOADING : ABOUT_US_CONTEXT_FAILED,
        payload : message
      })

      
  
      export const loadingGetStoreInfo = (loader : boolean,message : string) => ({
        type : loader  ? GET_STORE_INFO_LOADING : GET_STORE_INFO_FAILED,
        payload : message
      })

      export const getStore = (storeInfo : storeInfo) => ({
        type : GET_STORE_INFO,
        payload : storeInfo
      })


      export const loadingUpdateStoreInfo = (loader : boolean,message : string) => ({
        type : loader  ? UPADTE_STORE_INFO_LOADING : UPADTE_STORE_INFO_FAILED,
        payload : message
      })

      export const updateStore = () => ({
        type : UPADTE_STORE_INFO,
        payload : null
      })

      


  
  