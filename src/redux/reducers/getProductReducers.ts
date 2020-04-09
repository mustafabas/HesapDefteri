import { ProductState, Action } from "../states";
import { PRODUCT_GET, PRODUCT_LOADING } from "../types";


const intialState = {
  products: [],
  isProductLoading: false || null
};

export default (state: ProductState = intialState, action: Action) => {
  switch (action.type) {
    case PRODUCT_GET:
        
      return {
        ...state,
        products: action.payload,
        isProductLoading:false
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        isProductLoading: action.payload
      };
    default:
      return state;
  }
};
