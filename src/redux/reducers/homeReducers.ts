import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { HomeState, Action } from "../states";
import { CUSTOMER_GET, HOME_LOADING_CUSTOMERS, CUSTOMER_GET_MORE, CUSTOMER_GET_MORE_LOADING, DETECT_USER_FROM_CALL_LOADING, DETECT_USER_FROM_CALL } from "../types";


const intialState = {
  customers: [],
  isHomeLoading: false || null,
  totalRecords : 0,
  customerMoreLoading : false,
  detectedCustomer : null,
  detectingCustomerLoading : false
};

export default (state: HomeState = intialState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_GET:
        
      return {
        ...state,
        customers: action.payload[0],
        totalRecords : action.payload[1],
        isHomeLoading:false
      };
      case CUSTOMER_GET_MORE:
        
        return {
          ...state,
          customers: [...state.customers, ...action.payload],
          isHomeLoading:false,
          customerMoreLoading : false
        };
    case HOME_LOADING_CUSTOMERS:
      return {
        ...state,
        isHomeLoading: action.payload
      };
      case CUSTOMER_GET_MORE_LOADING:
        return {
          ...state,
          customerMoreLoading : action.payload
        }
      case DETECT_USER_FROM_CALL :
        return {
          ...state,
          detectedCustomer : action.payload,
          detectingCustomerLoading : false,
        }
      case DETECT_USER_FROM_CALL_LOADING:
        return {
          ...state,
          detectingCustomerLoading : action.payload,
          detectedCustomerId : action.payload ? null : 0
        }
      
    default:
      return state;
  }
};
