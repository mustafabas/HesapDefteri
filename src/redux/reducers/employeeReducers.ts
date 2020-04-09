import { EmployeeState, Action } from "../states";
import { EMPLOYEE_GET, LOADING_EMPLOYEES } from "../types";


const intialState = {
    employees: [],
    isLoading: false
};

export default (state: EmployeeState = intialState, action: Action) => {
    switch (action.type) {
        case EMPLOYEE_GET:

            return {
                ...state,
                employees: action.payload,
                isLoading: false
            };
        case LOADING_EMPLOYEES:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};
