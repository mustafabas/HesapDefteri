import { Action, ProductForCustomer } from "../states";
import { ABOUT_US_CONTEXT, LOGIN_STARTED, RESET_PROPS, GET_USER_INFO, GET_USER_INFO_LOADING, GET_USER_INFO_FAILED, ABOUT_US_CONTEXT_LOADING, ABOUT_US_CONTEXT_FAILED, UPDATE_USER_GENERAL_FAILED, UPDATE_USER_GENERAL_LOADING, UPDATE_USER_GENERAL, UPDATE_USER_SECURITY_LOADING, UPDATE_USER_SECURITY_FAILED, UPDATE_USER_SECURITY, GET_STORE_INFO, GET_STORE_INFO_LOADING, GET_STORE_INFO_FAILED, UPADTE_STORE_INFO_LOADING as UPDATE_STORE_INFO_LOADING, UPADTE_STORE_INFO_FAILED as UPDATE_STORE_INFO_FAILED, UPADTE_STORE_INFO as UPDATE_STORE_INFO, SEND_SUPPORT_MESSAGE_SUCCEED, SEND_SUPPORT_MESSAGE_LOADING, SEND_SUPPORT_MESSAGE_FAILED } from "../types";
import { ActionSheet } from "native-base";
import { UserInfo, storeInfo } from "../actions/profileActions";
import { userInfo } from "os";




const intialState = {
  loading : false,
  context : "",
  message : "",
  userInfo : {} as UserInfo,
  loadingUserInfo : false,
  loadingUserInfoGeneralUpdate : false,
  IsSucceedUserInfoUpdate : false,
  loadingUserSecurityInfo : false,
  IsSuceedUserSecurityInfo : false,
  loadingGetStoreInfo : false,
  IsSuceedGetStoreInfo : false,
  loadingUpdateStoreInfo : false,
  IsSucceedUpdateStoreInfo : false,
  storeInfo : {} as storeInfo,
  IsSuceedUserSupportAction : false,
  loadingSupportAction : false,


 };

interface Profile {
    loading : boolean;
    context: string;
    message : string;
    userInfo : UserInfo;
    loadingUserInfo : boolean;
    loadingUserInfoGeneralUpdate : boolean;
    IsSucceedUserInfoUpdate : boolean;
    loadingUserSecurityInfo : boolean;
    IsSuceedUserSecurityInfo : boolean;
    loadingGetStoreInfo : boolean;
    IsSuceedGetStoreInfo : boolean;
    loadingUpdateStoreInfo : boolean;
    IsSucceedUpdateStoreInfo : boolean;
    storeInfo : storeInfo;
    IsSuceedUserSupportAction : boolean;
    loadingSupportAction : boolean;
    
}

export default (state: Profile = intialState, action: Action) => {
  switch (action.type) {

    case SEND_SUPPORT_MESSAGE_LOADING : 
    return {
        ...state,
        loadingSupportAction : true
    }
    case SEND_SUPPORT_MESSAGE_FAILED :
        return {
            ...state,
            loadingSupportAction : false,
            message : action.payload
        }
    case SEND_SUPPORT_MESSAGE_SUCCEED :
        return {
            ...state,
            loadingSupportAction : false,
            IsSuceedUserSupportAction : true
        }
    case UPDATE_USER_SECURITY_LOADING : 
    return {
        ...state,
        loadingUserSecurityInfo : true,

    }
    case UPDATE_USER_SECURITY_FAILED : 

    return {
        ...state,
        loadingUserSecurityInfo : false,
        message : action.payload,
        IsSuceedUserSecurityInfo: false,
    }
    case UPDATE_USER_SECURITY: 
    return {
        ...state,
        loadingUserSecurityInfo : false,
        IsSuceedUserSecurityInfo : true,
        message : action.payload
    }

      case UPDATE_USER_GENERAL :
          return {
              ...state,
              IsSucceedUserInfoUpdate : true,
              message:action.payload
          }
      case UPDATE_USER_GENERAL_LOADING :
          return {
              ...state,
              loadingUserInfoGeneralUpdate : true
          }
      case UPDATE_USER_GENERAL_FAILED:
          return {
              ...state,
              loadingUserInfoGeneralUpdate : false,
              message : action.payload,
              IsSucceedUserInfoUpdate : false,
          }
    case ABOUT_US_CONTEXT:
        return {
            ...state,
            context : action.payload,
            loading :false,

        }
    case  ABOUT_US_CONTEXT_LOADING :
        return {
            ...state,
            loading : true,
        }
    case ABOUT_US_CONTEXT_FAILED:
        return {
            ...state,
            loading :false,
            message : action.payload
        }
    case RESET_PROPS :
        return {
            ...state,
            loading: false,
            message : "",
            loadingUserInfo : false,
            loadingUserInfoGeneralUpdate : false,
            IsSucceedUserInfoUpdate : false,
            IsSuceedUserSecurityInfo : false,
            loadingUserSecurityInfo : false,
            loadingGetStoreInfo : false,
            IsSuceedGetStoreInfo : false,
            loadingUpdateStoreInfo : false,
            IsSucceedUpdateStoreInfo : false,
            storeInfo : {} as storeInfo,
            IsSuceedUserSupportAction : false,
        loadingSupportAction : false,

        }
    case GET_USER_INFO_LOADING:
        return {
            ...state,
            loadingUserInfo: true,
            message:null
        }
    case GET_USER_INFO_FAILED:
        return {
            ...state,
            loadingUserInfo : false,
            message : action.payload
        }
    case GET_USER_INFO :
        return { 
            ...state,
            userInfo : action.payload,
            loadingUserInfo : false,
            IsSuceedGetStoreInfo : true,
            message : null,
        }
    case GET_STORE_INFO : 
    return {
        ...state,
        storeInfo : action.payload,
        loadingGetStoreInfo : false,
        message : null,
        IsSuceedGetStoreInfo:true
    }
    case GET_STORE_INFO_LOADING : 
    return {
        ...state,
        loadingGetStoreInfo : true
    }
    case GET_STORE_INFO_FAILED : 
    return {
        ...state,
        loadingGetStoreInfo : false,
        message : action.payload 
    }
    case UPDATE_STORE_INFO_LOADING : 
    return {
        ...state,
        loadingUpdateStoreInfo : true
    }
    case UPDATE_STORE_INFO_FAILED : 
    return {
        ...state,
        loadingUpdateStoreInfo : false,
        message : action.payload 
    }
    case UPDATE_STORE_INFO :
    return {
        ...state,
        IsSucceedUpdateStoreInfo : true,
    }


    default:
      return state;
  }
};
