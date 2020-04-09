import { AddUser, Action } from "../states";
import {ADD_USER_SUCCEED,ADD_USER_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    AddUserMessage: "",
  };

export default (state: AddUser = initalState, action: Action) => {
  switch (action.type) {
    case ADD_USER_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        AddUserMessage:action.payload,
      };
      case ADD_USER_FAILED:     
      return {
        ...state,
        isSuccess:false,
        AddUserMessage:action.payload,
      };
    default:
      return state;
  }
};