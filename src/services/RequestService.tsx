
import axios from 'axios'
import { WATER_NOTIFICATION_DELETE_BYID, WATER_NOTIFICATION_TOKEN_DELETE, WATER_ANDROID_UPDATE_AVAILABLE } from '../redux/constants'
import { AsyncStorage, Alert, Linking } from 'react-native';
import VersionNumber from 'react-native-version-number';

export const updateAndroidIfAvailable = () => {

  console.log(VersionNumber.appVersion)

  // axios.get(WATER_ANDROID_UPDATE_AVAILABLE + "?buildNumber=" + VersionNumber.appVersion).then(res => {
  //   if(res.data.result) {
      
  //   }
  // })
  Alert.alert(
    'Uygulamaya Güncelleme Geldi',
    'Uygulamayı Kullanmak için güncel halini indirin!',
    [
      
      {text: 'Güncelle', onPress: () => Linking.openURL('https://drive.google.com/uc?export=download&id=18MzA39ArY6l0R4cVgIFVo0RVJgKN9hY-')},
    ],
    {cancelable: false},
  );

}

export const DeleteNotification = (id1:number) => {
    axios.get(WATER_NOTIFICATION_DELETE_BYID+"/delete?notificationId="+id1.toString()).then(res=>
       {
           console.log(res);
            if(res.data.result){
                console.log("deleted notification");
            }
       }
       ).catch(err=>{
           console.log(err);
       });
 }


 export const deleteNotificaitonToken = (userId : string , token : string,notificationToken : string) => {

    
    console.log("notificationTokenSilincek",userId,"toke",token,"nottoke",notificationToken)


        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  
      axios.post(WATER_NOTIFICATION_TOKEN_DELETE,{
        userId: userId,
        appToken: notificationToken
      }
      
        ,{headers: headers })
      .then((response) =>{
        
      if(response.data.isSuccess){
         


        }
       
      
      else {


      }
      })
      .catch((err) => {

      });
    
  



 }