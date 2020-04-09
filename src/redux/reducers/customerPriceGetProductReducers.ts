import { CustomerPriceProductState, Action } from "../states";
import { CUSTOMERPICE_PRODUCT_GET, CUSTOMERPICE_PRODUCT_LOADING } from "../types";


const intialState = {
  products: [],
  isProductLoading: false
};

export default (state: CustomerPriceProductState = intialState, action: Action) => {
  switch (action.type) {
    case CUSTOMERPICE_PRODUCT_GET:
        
      return {
        ...state,
        products: action.payload,
        isProductLoading:false,
      };
    case CUSTOMERPICE_PRODUCT_LOADING:
      return {
        ...state,
        isProductLoading: action.payload
      };
    default:
      return state;
  }
};
