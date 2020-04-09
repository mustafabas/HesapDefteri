import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET,RESET_PROPS, GET_CUSTOMER_ORDER_DETAIL_LOADING, GET_CUSTOMER_ORDER_DETAIL, GET_CUSTOMER_ORDER_DETAIL_FAILED, UPDATE_ORDER_DETAIL, UPDATE_ORDER_DETAIL_LOADING, UPDATE_ORDER_DETAIL_FAILED, GET_CUSTOMER_ORDER_LIST_LOADING, GET_CUSTOMER_ORDER_LIST_FAILED, GET_CUSTOMER_ORDER_LIST, GET_CUSTOMER_ORDER_LIST_MORE } from "../types";
import {Action} from '../states';

import {notificationListItem, INotificationItem} from '../actions/notificationAction'
import { orderDetail, isLoadingStatusUpdate, orderListItem } from "../actions/orderDetailActions";

const intialState = {
    isLoading : false || null,
    message:"",
    orderDetail : {} as  orderDetail,
    isSuccedOrderStatusUpdate : false,
    isLoadingOrderStatus : false,
    orderStatusMessage : '',
    orderList : [],
    messageOrderList : '',
    isLodingOrderList : false || null, 
};

export interface orderDetailState {
    isLoading: boolean | null;
    message: string;
    orderDetail: orderDetail;
    isSuccedOrderStatusUpdate : boolean;
    isLoadingOrderStatus : boolean;
    orderStatusMessage : string;
    orderList : orderListItem[];
    isLodingOrderList : boolean | null;
    messageOrderList : string;
  }


export default (state: orderDetailState = intialState, action: Action) => {
  switch (action.type) {

    case GET_CUSTOMER_ORDER_LIST_LOADING:
      return {
        ...state,
        isLodingOrderList : true,
        messageOrderList : ''
      };
    case  GET_CUSTOMER_ORDER_LIST_FAILED :
      return {
        ...state,
        isLodingOrderList : false,
        messageOrderList : action.payload
      };

    case GET_CUSTOMER_ORDER_LIST_MORE : 
    return {
      ...state,
      isLodingOrderList : false,
      orderList : [...state.orderList, ...action.payload]
    }
    case GET_CUSTOMER_ORDER_LIST :
      return {
        ...state,
        isLodingOrderList : false,
        messageOrderList : '',
        orderList: action.payload
      }
    case GET_CUSTOMER_ORDER_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        message :action.payload
      };
    case GET_CUSTOMER_ORDER_DETAIL:
        return {
          ...state,
          isLoading:false,
          message: '',
          orderDetail : action.payload
        };
    case GET_CUSTOMER_ORDER_DETAIL_FAILED:
        return {
            ...state,
              isLoading:false,
              message:action.payload
            };
    case RESET_PROPS :
        return {
          ...state,
          isLoading:false,
          message : "",
          isLoadingStatusUpdate : false,
          isSuccedOrderStatusUpdate : false,
          orderStatusMessage : '',
          isLoadingOrderStatus : false,
          isLoadingOrderList : false,
          messageOrderList : '',
        };
      case UPDATE_ORDER_DETAIL :
        return {
          ...state,
          isLoadingStatusUpdate : false,
          isSuccedOrderStatusUpdate : true,
          orderStatusMessage : action.payload
        }
        case UPDATE_ORDER_DETAIL_LOADING :
          return {
            ...state,
            isLoadingOrderStatus : true,

          }
          case UPDATE_ORDER_DETAIL_FAILED:
            return {
              ...state,
              isLoadingOrderStatus : false,
              orderStatusMessage: action.payload,
            }


    default:
      return state ;

  }
};
