import axios from 'axios'
import {WATER_EMPLOYEECOST_DELETE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEECOST_DELETE_SUCCEED,EMPLOYEECOST_DELETE_FAILED} from './../types'
import {Action} from '../states'
import { GetEmployeeCost } from './getEmployeeCostAction';
import { reset } from './loginAction';


export function employeeCostDelete(id:number) {

  return (dispatch : any) =>  {

  axios.post(WATER_EMPLOYEECOST_DELETE,
    {
        id: id,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeeCostDeleteIsSucceed(true, "Maliyet Silindi!"));
        dispatch(GetEmployeeCost());
        dispatch(reset())
      }
    }
  })
  .catch(error => { 

  });
  }
}
  export const employeeCostDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEECOST_DELETE_SUCCEED : EMPLOYEECOST_DELETE_FAILED,
    payload : message
  })


  
