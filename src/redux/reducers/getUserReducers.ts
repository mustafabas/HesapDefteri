import { getUserState, Action } from "../states";
import { USER_GET, USER_LOADING } from "../types";
import {IGetUserItem } from "../models/userModel"

const initialvaluesUser : IGetUserItem ={
    userId: 0,
    nameSurname : "",
    email :"",
    password :"",
    active: false,

}

const intialState = {
  user: initialvaluesUser,
  isUserLoading: false
};

  export default (state: getUserState = intialState, action: Action) => {
  switch (action.type) {
    case USER_GET:
        
      return {
        ...state,
        user: action.payload,
        isUserLoading:false
      };
    case USER_LOADING:
      return {
        ...state,
        isUserLoading: action.payload
      };
    default:
      return state;
  }
};
