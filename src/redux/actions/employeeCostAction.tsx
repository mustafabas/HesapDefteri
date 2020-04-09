import axios from 'axios'
import {WATER_ADD_EMPLOYEE_COST} from '../constants'
import { Dispatch } from "react";
import {EMPLOYEE_COST_ADD_SUCCEED,EMPLOYEE_COST_ADD_FAILED, EMPLOYE_COST_ADD_LOADING} from '../types'
import {Action} from '../states'
import { copyFile } from 'fs';
import { reset } from './loginAction';


export function employeeCost(employeId:number, cost:number) {

  return (dispatch : Dispatch<Action>) =>  {

    dispatch(employeeAddCostLoading(true));
    console.log(employeId + "   " + cost)
  axios.post(WATER_ADD_EMPLOYEE_COST,
    {
        employeId: employeId,
        cost: cost,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
 
        dispatch(employeCostIsSucceed(true, "Çalışan Gider Eklendi!"));
        dispatch(reset());
      

      }
    }else {
      dispatch(employeCostIsSucceed(false,"Çalışan Gider Eklenirken bir hata oluştu."));
      dispatch(reset());
  
    }
  })
  .catch(error => { 
    dispatch(employeCostIsSucceed(false,"Çalışan Gider Eklenirken bir hata oluştu."));
    dispatch(reset());

  });

  }

}

  export const employeCostIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_COST_ADD_SUCCEED : EMPLOYEE_COST_ADD_FAILED,
    payload : message
  })
  
  export const employeeAddCostLoading = (loading:boolean) => ({
    type :  EMPLOYE_COST_ADD_LOADING,
    payload : loading
  })
  
  
