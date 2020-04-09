import { AddCustomerPrice, Action } from "../states";
import {CUSTOMERPRICE_ADD_FAILED,CUSTOMERPRICE_ADD_SUCCEED, RESET_PROPS} from "../types";


const initalState = {
    isSuccess: false,
    AddCustomerPriceMessage: "",
  };

export default (state: AddCustomerPrice = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMERPRICE_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        AddCustomerPriceMessage:action.payload,
      };
      case CUSTOMERPRICE_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        AddCustomerPriceMessage:action.payload,
      };
      case RESET_PROPS :
        return {
          ...state,
          isSuccess:false,
          AddCustomerPriceMessage : ""
        }
      
    default:
      return state;
  }
};