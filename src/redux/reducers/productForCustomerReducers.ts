import { ProductForCustomer, Action } from "../states";
import { PRODUCT_FOR_CUSTOMER_GET, PRODUCT_FOR_CUSTOMER_LOADING, RESET_PROPS } from "../types";
import {IProductForCustomerItem} from "../models/productForCustomerModel"

const initialProduct:IProductForCustomerItem={
    productId:0,
    productName:"",
    unitPrice:0,
    productCode:"",
}

const intialState = {
  product: {} as IProductForCustomerItem,
  isLoading: false
};

export default (state: ProductForCustomer = intialState, action: Action) => {
  switch (action.type) {

    case PRODUCT_FOR_CUSTOMER_GET:
        
      return {
        ...state,
        product: action.payload,
        isLoading:false
      };
    case PRODUCT_FOR_CUSTOMER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case RESET_PROPS:
      return {
        ...state,
        product: {} as IProductForCustomerItem,
        isLoading: false,
      }
    default:
      return state;
  }
};
