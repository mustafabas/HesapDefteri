import { CustomerPriceEdit, Action } from "../states";
import {CUSTOMERPRICE_EDIT_SUCCEED,CUSTOMERPRICE_EDIT_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    CustomerPriceEditMessage: "",
  };

export default (state: CustomerPriceEdit = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMERPRICE_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        CustomerPriceEditMessage:"Yeni Fiyat Düzenlendi.",
      };
      case CUSTOMERPRICE_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        CustomerPriceEditMessage:"Yeni Fiyat Düzenlenemedi!",
      };
    default:
      return state;
  }
};