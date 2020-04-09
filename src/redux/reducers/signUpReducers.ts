import { LOGIN_STARTED,LOGIN_FAILED,LOGIN_SUCCEED,RESET_PROPS, USER_CREATE_FIRST_STEP, SIGNUP_STARTED, SIGNUP_SUCCEED, SIGNUP_FAILED, SIGNUP2_STARTED, SIGNUP2_SUCCEED, SIGNUP2_FAILED, SIGNUP3_STARTED, SIGNUP3_SUCCEED, SIGNUP3_FAILED } from "../types";
import {Action, UserState, UserCreate} from '../states';

const intialState = {
    isLoading : false,
    isFinished : false,
    isSucceed : false,
    loginErrorMessage:"",
    userFirstData : {} as UserFirstData,
    isSecondLoading : false,
    isSecondFinished : false,
    isSecondSucceed : false,
    isThirdLoading : false,
    isThirdFinished : false,
    isThirdSucceed : false,
};

export interface UserFirstData {
    NameSurname: string;
    email: string;
    password: string;
}

export default (state: UserCreate = intialState, action: Action) => {
  switch (action.type) {
    case SIGNUP_STARTED:
      return {
        ...state,
        isLoading: action.payload,
        loginErrorMessage :""
      };
    case SIGNUP_SUCCEED:
        return {
          ...state,
          isFinished:true,
          isSucceed:true,
          isLoading:false,
          loginErrorMessage: action.payload
        };
    case SIGNUP_FAILED:
        return {
            ...state,
            isFinished: true,
            isSucceed:false,
              isLoading:false,
              loginErrorMessage:action.payload
            };
    case SIGNUP2_STARTED:
      return {
        ...state,
        isSecondLoading: action.payload,
        loginErrorMessage :""
      };
    case SIGNUP2_SUCCEED:
        return {
          ...state,
          isSecondFinished:true,
          isSecondSucceed:true,
          isSecondLoading:false,
          loginErrorMessage: action.payload
        };
    case SIGNUP2_FAILED:
        return {
            ...state,
            isSecondFinished: true,
            isSecondSucceed:false,
              isSecondLoading:false,
              loginErrorMessage:action.payload
            };

            case SIGNUP3_STARTED:
      return {
        ...state,
        isThirdLoading: action.payload,
        loginErrorMessage :""
      };
    case SIGNUP3_SUCCEED:
        return {
          ...state,
          isThirdFinished:true,
          isThirdSucceed:true,
          isThirdLoading:false,
          loginErrorMessage: action.payload
        };
    case SIGNUP3_FAILED:
        return {
            ...state,
            isThirdFinished: true,
            isThirdSucceed:false,
              isThirdLoading:false,
              loginErrorMessage:action.payload
            };
    case RESET_PROPS :
        return {
          ...state,
          isLoading : false,
    isFinished : false,
    isSucceed : false,
    loginErrorMessage:"",

    isSecondLoading : false,
    isSecondFinished : false,
    isSecondSucceed : false,
    isThirdLoading : false,
    isThirdFinished : false,
    isThirdSucceed : false,
        };
    case USER_CREATE_FIRST_STEP :
        return {
            ...state,
            userFirstData : action.payload
        }

    default:
      return state ;

  }
};
