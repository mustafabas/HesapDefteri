import { EditOrder, Action } from "../states";
import {UPDATE_ORDER_SUCCEED,UPDATE_ORDER_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    EditOrderMessage: "",
  };

export default (state: EditOrder = initalState, action: Action) => {
  switch (action.type) {
    case UPDATE_ORDER_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EditOrderMessage:action.payload,
      };
      case UPDATE_ORDER_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EditOrderMessage:action.payload,
      };
    default:
      return state;
  }
};