import { CustomerDelete, Action } from "../states";
import {CUSTOMER_DELETE_SUCCEED,CUSTOMER_DELETE_FAILED, CUSTOMER_DELETE_LOADING, RESET_PROPS} from "../types";


const initalState = {
    isSuccessCustomerDelete: false,
    isLoadingCustomerDelete:false,
    message: ""
  };

export default (state: CustomerDelete = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_DELETE_SUCCEED:    
      return {
        ...state,
        isSuccessCustomerDelete:true,
        message : action.payload
      };
      case CUSTOMER_DELETE_FAILED:     
      return {
        ...state,
        isSuccessCustomerDelete:false,
        message : action.payload
      };
      case RESET_PROPS :
        return{
          ...state,
          isSuccessCustomerDelete:"",
          isLoadingCustomerDelete:false,
          message: ""
        };
      case CUSTOMER_DELETE_LOADING:
        return{
          ...state,
          isLoadingCustomerDelete:action.payload 
        };

       

    default:
      return state;
  }
};