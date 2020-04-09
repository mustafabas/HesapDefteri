import { EmployeeAdd, Action, EmployeeEditRedecurState } from "../states";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED, EMPLOYEE_GET_ONE, EMPLOYEE_EDIT_LOADING, RESET_PROPS, EMPLOYEE_GET_EDIT_LOADING} from "../types";
import { stat } from "fs";
import { IEmployeeItemBaseResponseModel } from "../models/employeeModel";


const initalState = {
    isSuccess: false,
    EmployeeUpdateMessage: "",
    employee:{} as IEmployeeItemBaseResponseModel,
    isLoading:false,
    isLoadignGetEmployee : false || null
  };

export default (state: EmployeeEditRedecurState = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeUpdateMessage:"Çalışan Düzenlendi.",
        isLoading : false
      };
      case EMPLOYEE_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeUpdateMessage:"Çalışan Düzenlenemedi!",
        isLoading : false
      };
      case EMPLOYEE_GET_ONE:     
      return {
        ...state,
        isLoadignGetEmployee : false,
        employee: action.payload,
        EmployeeUpdateMessage:"",
      };
      case EMPLOYEE_EDIT_LOADING:
        return {
          ...state,
          isLoading:action.payload,
        };
        case RESET_PROPS:
          return {
            ...state,
            EmployeeUpdateMessage:"",
            isSuccess:false
          }
        case EMPLOYEE_GET_EDIT_LOADING :
          return {
            ...state,
            isLoadignGetEmployee: action.payload
          }
    default:
      return state;
  }
};