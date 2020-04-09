import { OrderDelete, Action } from "../states";
import {ORDER_DELETE_SUCCEED,ORDER_DELETE_FAILED, RESET_PROPS} from "../types";


const initalState = {
    isSuccess: false,
    Message: ""
  };

export default (state: OrderDelete = initalState, action: Action) => {
  switch (action.type) {
    case ORDER_DELETE_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        Message : "Silme İşlemi Başarılı."
      };
      case ORDER_DELETE_FAILED:     
      return {
        ...state,
        isSuccess:false,
        Message : "Bir Hata Meydana Geldi."
      };
      case RESET_PROPS: 
      return {
        ...state,
        isSuccess:false,
        Message : ""
      }
    default:
      return state;
  }
};