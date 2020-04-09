import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { CustomerEdit, Action } from "../states";
import {CUSTOMER_EDIT_SUCCEED,CUSTOMER_EDIT_FAILED, CUSTOMER_GETBY_ID_LOADING, CUSTOMER_GETBY_ID, RESET_PROPS} from "../types";
import { Customer } from "../actions/customerEditAction";


const initalState = {
    isSuccess: false,
    CustomerEditMessage: "",
    customer : {} as Customer,
    loading : false,

  };

export default (state: CustomerEdit = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        CustomerEditMessage:action.payload,
      };
      case RESET_PROPS :
        return {
          ...state,
          isSuccess: false,
          CustomerEditMessage: "",
          customer : {} as Customer,
          loading : false,
        }
      case CUSTOMER_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        CustomerEditMessage:action.payload,
      };
      case CUSTOMER_GETBY_ID_LOADING :
        return {
          ...state,
          loading : action.payload
        }
        case CUSTOMER_GETBY_ID :
          return {
            ...state,
            customer : action.payload,

          }
    default:
      return state;
  }
};