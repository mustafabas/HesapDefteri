import axios from 'axios'
import {WATER_EMPLOYEECOST_EDIT} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEECOST_EDIT_SUCCEED,EMPLOYEECOST_EDIT_FAILED} from './../types'
import {Action} from '../states'


export function employeeCostEdit(id:number,employeId:number,cost:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_EMPLOYEECOST_EDIT,
    {
        id: id,
        employeId:employeId,
        cost: cost,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeCostEditIsSucceed(true, "Maliyet Düzenlendi!"));
      }
    }
  })
  .catch(error => { 
  });

  }

}

  
  export const employeCostEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEECOST_EDIT_SUCCEED : EMPLOYEECOST_EDIT_FAILED,
    payload : message
  })
  
