import { EmployeeAdd, Action } from "../states";
import {EMPLOYEE_ADD_SUCCEED,EMPLOYEE_ADD_FAILED, EMPLOYEE_ADD_LOADING, RESET_PROPS} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeAddMessage: "",
    isLoading:false
  };

export default (state: EmployeeAdd = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeAddMessage:"Çalışan Eklendi.",
        isLoading:false
      };
      case EMPLOYEE_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeAddMessage:"Çalışan Eklenemedi!",
        isLoading:false
      };
      case EMPLOYEE_ADD_LOADING:     
      return {
        ...state,
        isLoading:action.payload,
        EmployeeAddMessage:''
      };
    case RESET_PROPS:
      return {
        isSuccess:false,
        EmployeeAddMessage:'',
        isLoading:false
      }
    default:
      return state;
  }
};