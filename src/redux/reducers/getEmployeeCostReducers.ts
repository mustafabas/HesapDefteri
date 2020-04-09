import { GetEmployeeCostState, Action } from "../states";
import { EMPLOYEECOST_GET, EMPLOYEECOST_LOADING } from "../types";

const intialState = {
    employees: [],
    isLoading: false
};

export default (state: GetEmployeeCostState = intialState, action: Action) => {
    switch (action.type) {
        case EMPLOYEECOST_GET:

            return {
                ...state,
                employees: action.payload,
                isLoading: false
            };
        case EMPLOYEECOST_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};
