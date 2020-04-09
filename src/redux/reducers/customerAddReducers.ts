import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { CustomerAdd, Action } from "../states";
import {CUSTOMER_ADD_SUCCEED,CUSTOMER_ADD_FAILED, CUSTOMER_ADD_LOADING, RESET_PROPS} from "../types";


const initalState = {
    isSuccess: false,
    loading : false,
    isTried : false,
    CustomerAddMessage: "",
  };

export default (state: CustomerAdd = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        loading:false,
        isTried :true,
        
        CustomerAddMessage:"Müşteri Eklendi.",
      };
      case CUSTOMER_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        loading : false,
        isTried : true,

        CustomerAddMessage:action.payload,
      };
      case CUSTOMER_ADD_LOADING :
        return {
          ...state,
          loading : action.payload
        }
        case RESET_PROPS :
          return {
            ...state,
            isSuccess:false,
        loading : false,
        isTried : false,
          }
    default:
      return state;
  }
};