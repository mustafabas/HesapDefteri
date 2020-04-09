import { ProductEdit, Action } from "../states";
import {EDIT_PRODUCT_SUCCEED,EDIT_PRODUCT_FAILED, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_LOADING, EDIT_PRODUCT_LOADING, RESET_PROPS} from "../types";
import { IProduct } from "../actions/productEditAction";


const initalState = {
    isSuccess: false,
    ProductEditMessage: "",
    product : {} as IProduct,
    Secondloading : false,
    loading: false,
    SecondisSuccess: false,

  };

export default (state: ProductEdit = initalState, action: Action) => {
  switch (action.type) {
    case EDIT_PRODUCT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        loading : false,

        ProductEditMessage:"Ürün Düzenlendi.",
      };
      case EDIT_PRODUCT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        loading : false,
        ProductEditMessage:"Ürün Düzenlenemedi!",
      };
      case GET_PRODUCT_BY_ID:
        return {
          ...state,
          product : action.payload,
          Secondloading:false,
        }
        case GET_PRODUCT_BY_ID_LOADING : 
        return {
          ...state,
          Secondloading : true,
        }
        case EDIT_PRODUCT_LOADING : 
        return {
          ...state,
          loading: true
        }
        case RESET_PROPS :
          return {
            ...state,
            isSuccess: false,
            ProductEditMessage: "",
            product : {} as IProduct,
            Secondloading : false,
            loading: false,
            SecondisSuccess: false,
        
          }
      

    default:
      return state;
  }
};