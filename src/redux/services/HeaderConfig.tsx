
import axios, { AxiosInstance } from 'axios'
import {WATER_BASE_URL_NEW} from '../constants'
import {AsyncStorage } from 'react-native'



export async function axiosBase () {
    var userToken = await AsyncStorage.getItem("userToken")

    const instance = axios.create({
    
    

        baseURL: WATER_BASE_URL_NEW,
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`}
      });
    return instance
}

