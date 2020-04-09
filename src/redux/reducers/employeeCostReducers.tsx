import { EmployeeCostAdd, Action } from "../states";
import {EMPLOYEE_COST_ADD_SUCCEED,EMPLOYEE_COST_ADD_FAILED, EMPLOYEECOST_LOADING, RESET_PROPS, EMPLOYE_COST_ADD_LOADING} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeCostAddMessage: "",
    EmployeAddCostLoading:false,
    
  };

export default (state: EmployeeCostAdd = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_COST_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeCostAddMessage:"Çalışan Gider Eklendi.",
        
      };
      case EMPLOYEE_COST_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeCostAddMessage:"Çalışan Gider Eklenemedi!",
      };
      case EMPLOYE_COST_ADD_LOADING:
        return {
          ...state,
          EmployeAddCostLoading:true
        }
        case RESET_PROPS:
          return {
            ...state,
            EmployeeCostAddMessage:"",
            EmployeAddCostLoading:false
          }
    default:
      return state;
  }
};