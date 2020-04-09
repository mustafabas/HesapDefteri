import { ReportState, Action } from "../states";
import { REPORT_GET, REPORT_LOADING, REPORT_LOADING_PRODUCT_PIE, REPORT_GET_PRODUCT_PIE } from "../types";
import { IReportItem } from "../models/reportModel"
import { productCountList } from "../actions/reportAction";

// const initialReportItem: {
//     totalIncome: 0,
//     totalCost: 0,
//     totalPaidAmount: 0,
//     totalRestAmount: 0,
//     totalWorkerSalary: 0,
//     reportProductItems: [],
// }

const intialState = {
    report: {} as IReportItem,
    isReportLoading: false,
    reportProductPie : {} as productCountList,
    isReportLoadingProductPie : false || null
};

export default (state: ReportState = intialState, action: Action) => {
    switch (action.type) {
        case REPORT_GET:

            return {
                ...state,
                report: action.payload,
                isReportLoading: false
            };
        case REPORT_LOADING:
            return {
                ...state,
                isReportLoading: action.payload
            };
        case REPORT_LOADING_PRODUCT_PIE:
            return{
                ...state,
                isReportLoadingProductPie : action.payload
            }
        case REPORT_GET_PRODUCT_PIE:
            return {
                ...state,
                reportProductPie : action.payload,
                isReportLoadingProductPie : false
            }
        default:
            return state;
    }
};
