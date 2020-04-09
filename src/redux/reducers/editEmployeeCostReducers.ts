import { EmployeeCostEdit, Action } from "../states";
import {EMPLOYEECOST_EDIT_SUCCEED,EMPLOYEECOST_EDIT_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeCostAddMessage: "",
  };

export default (state: EmployeeCostEdit = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEECOST_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeCostAddMessage:"Maliyet Düzenlendi.",
      };
      case EMPLOYEECOST_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeCostAddMessage:"Maliyer Düzenlenemedi!",
      };
    default:
      return state;
  }
};