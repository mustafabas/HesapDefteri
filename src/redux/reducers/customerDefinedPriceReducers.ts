import { CustomerDefinedPriceState, Action } from "../states";
import { CUSTOMER_DEFINED_PRICE_GET, CUSTOMER_DEFINED_PRICE_LOADING } from "../types";


const intialState = {
  products: [],
  isProductLoading: false || null,
};

export default (state: CustomerDefinedPriceState = intialState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_DEFINED_PRICE_GET:
        
      return {
        ...state,
        products: action.payload,
        isProductLoading:false
      };
    case CUSTOMER_DEFINED_PRICE_LOADING:
      return {
        ...state,
        isProductLoading: action.payload
      };
    default:
      return state;
  }
};
