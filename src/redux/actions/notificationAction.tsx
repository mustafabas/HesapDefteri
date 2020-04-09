import axios from 'axios'
import { WATER_GET_NOTIFICATIONS, WATER_NOTIFICATIONS_UPDATED_VIEWED, WATER_GET_NEW_NOTIFICATION_COUNT } from './../constants'
import { Dispatch } from "react";

import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET, NOTIFICATION_COUNT_LOADING, NOTIFICATION_COUNT_FAILED, NOTIFICATION_COUNT_GET, NOTIFICATION_LIST_GET_MORE, NOTIFICATION_LIST_LOADING_MORE } from './../types'
import { Action } from '../states'




import { AsyncStorage } from 'react-native'


import { navigate } from '../services/Navigator';
import { reset } from './loginAction';
import { addOrder } from './addOrderAction';
import { loading } from './fetch';

export interface notificationListItem {
  notificationId: number;
  message: string;
  type: number;
  orderId: number;
  createdDate: string;
  viewed :boolean;
}

export interface INotificationItem {
  key: string;
  value: notificationListItem;
}


function  UpdateNotificationViewed(userId: string, userToken: string) {
  return (dispatch: any) => {

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  }
  console.log(WATER_NOTIFICATIONS_UPDATED_VIEWED + `?userId=${userId}`);
  axios.get(WATER_NOTIFICATIONS_UPDATED_VIEWED + `?userId=${userId}`, {
    headers: headers
  }).then((response) => {
    if (response.data.isSuccess) {
      console.log("updated kanka");
       dispatch(getNotificationCount());
    }
  })
    .catch(error => {
        console.log(error);
    });
  }
}
let counter :number = 0;
export function getNotifications(isUpdate:boolean, page?:number, pageSize?:number) {
  return (dispatch: any) => {
    dispatch(isLoading(true, ''))
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      console.log(WATER_GET_NOTIFICATIONS + `?userId=${userId}&page=${page ?page : 1}&pageSize=${pageSize ? pageSize:15}`)
      axios.get(WATER_GET_NOTIFICATIONS + `?userId=${userId}&page=${page ?page : 1}&pageSize=${pageSize ? pageSize:15}`, {
        headers: headers
      }).then((response) => {

        var notificationList: INotificationItem[] = []
        if(page==1 || !page){
          counter=0;
  
        }
  
        if (response.data.isSuccess) {
          
          response.data.result.forEach(element => {
            var notificationItem = {} as notificationListItem;
            notificationItem.notificationId = element.notificationId,
              notificationItem.message = element.message,
              notificationItem.type = element.type,
              notificationItem.orderId = element.orderId,
              notificationItem.createdDate = element.createdDate,
              notificationItem.viewed = element.viewed


            notificationList.push({
              key: counter.toString(),
              value: notificationItem
            })

            counter++;

          });
          dispatch(isLoading(false,""));
          if(page===1 || !page){
            dispatch(notification(notificationList));
          }
          else{
            dispatch(notificationMore(notificationList));

          }
        
          if(isUpdate)
          {
            console.log("geç to update");
           dispatch(UpdateNotificationViewed(userId,token));
          }

        } else {
          dispatch(isLoading(false, "Bildirimler alınırken hata oluştu"))
          dispatch(reset())
        }
      })
        .catch(error => {
          console.log(error);
          dispatch(addOrder(false, "Bildirimler alınırken hata oluştu"));
          dispatch(reset())
   
        });

    }).catch(err => {
      console.log(err);
      dispatch(addOrder(false, "Bildirimler alınırken hata oluştu"));
      dispatch(reset())
    })


  }

}

export function getNotificationCount() {
  return (dispatch: any) => {
    dispatch(isLoadingCount(true, ''))
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    
    axios.get(WATER_GET_NEW_NOTIFICATION_COUNT +`?userId=${userId}`,{
        headers : headers
      }).then((response) =>{
    
    if(response.data.isSuccess){
      console.log(response.data.result,`not data`)
      dispatch(notificationCount(response.data.result));   
       dispatch(getNotifications(false, 1));
  
      }else {

      }
    })
    .catch(error => {   
        console.log(error)
    });

  }).catch(err=> {
    console.log(err)
  })

  }

}




export const isLoading = (loading: boolean, message: string) => ({
  type: NOTIFICATION_LIST_LOADING ? NOTIFICATION_LIST_LOADING : NOTIFICATION_LIST_FAILED,
  payload: message
})
export const isLoadingCount= (loading: boolean, message: string) => ({
  type: NOTIFICATION_COUNT_LOADING ? NOTIFICATION_COUNT_LOADING : NOTIFICATION_COUNT_FAILED,
  payload: message
})
export const notificationCount = (result: number) => ({
  type: NOTIFICATION_COUNT_GET,
  payload: result
})
export const notification = (notificationList: INotificationItem[]) => ({
  type: NOTIFICATION_LIST_GET,
  payload: notificationList
})
export const notificationMore = (notificationList: INotificationItem[]) => ({
  type: NOTIFICATION_LIST_GET_MORE,
  payload: notificationList
})