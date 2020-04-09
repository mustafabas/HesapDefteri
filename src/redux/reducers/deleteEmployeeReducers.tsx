import { EmployeeDelete, Action } from "../states";
import {EMPLOYEE_DELETE_SUCCEED,EMPLOYEE_DELETE_FAILED, RESET_PROPS} from "../types";


const initalState = {
  isSuccess:false || null
  };

export default (state: EmployeeDelete = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
      };
      case EMPLOYEE_DELETE_FAILED:     
      return {
        ...state,
        isSuccess:false,
      };
      case RESET_PROPS:
        return{
          ...state,
          isSuccess:false
        }
    default:
      return state;
  }
};