import { LOGIN_STARTED,LOGIN_FAILED,LOGIN_SUCCEED,RESET_PROPS } from "../types";
import {Action, UserState} from '../states';

const intialState = {
    isLoading : false,
    isFinished : false,
    isSucceed : false,
    loginErrorMessage:""
};

export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        isLoading: action.payload,
        loginErrorMessage :""
      };
    case LOGIN_SUCCEED:
        return {
          ...state,
          isFinished:true,
          isSucceed:true,
          isLoading:false,
          loginErrorMessage: action.payload
        };
    case LOGIN_FAILED:
        return {
            ...state,
            isFinished: true,
            isSucceed:false,
              isLoading:false,
              loginErrorMessage:action.payload
            };
    case RESET_PROPS :
        return {
          ...state,
          isFinished:false,
          isSucceed:false,
          isLoading:false,
          loginErrorMessage : ""
        };
    default:
      return state ;

  }
};
