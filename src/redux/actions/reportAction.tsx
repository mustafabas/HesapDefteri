import {AsyncStorage } from 'react-native'

import axios from 'axios'
import { WATER_GET_REPORT, WATER_GET_REPORT_PRODUCTS_PIE } from './../constants'
import { Dispatch } from "react";
import { REPORT_GET, REPORT_LOADING, REPORT_GET_PRODUCT_PIE, REPORT_LOADING_PRODUCT_PIE } from './../types'
import { Action } from '../states'
import { IReportItem, IReportProductItems } from "../models/reportModel";


export interface productCountList {
    productList : productCountItem[];
    totalCount : number;

}
export interface productCountItem {
    count : number;
    name : string;
}

export function getReportProductsForPie(){
return(dispatch : Dispatch<Action>) => {
    loadingProductPie(true) ;
    console.log("asdasd")
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        let token = res[0][1];
        let userId = res[1][1];
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      var _WATER_GET_REPORT_PRODUCTS_PIE = WATER_GET_REPORT_PRODUCTS_PIE + `?UserId=${userId}`
      axios.get(_WATER_GET_REPORT_PRODUCTS_PIE ,{
          headers: headers
      } ).then((res) => {
        
        if(res.data.isSuccess) {
            var list : productCountItem[] = []
            var productCountListTmp = {} as  productCountList;
            productCountListTmp.totalCount = res.data.result.totalCount;

            res.data.result.productCountItem.forEach((element : productCountItem) => {
                list.push(element);

            });
            productCountListTmp.productList = list;
            dispatch(ReportProductPie(productCountListTmp))


        }else {

            dispatch(loadingProductPie(false));
        }
      }).catch(err => {
        dispatch(loadingProductPie(false));
      })


    }).catch(err=> {
        dispatch(loadingProductPie(false));
    })
    
}
}

export function GetReport(startDate:string,endDate:string) {

    return (dispatch: Dispatch<Action>) => {

        dispatch(loading(true));
        console.log("Eski StartDate")
        console.log(startDate)
        console.log("Eski endDate")
        console.log(endDate)
        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];
            
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }

          var WATER_GET_REPORT_WITH_DATES = WATER_GET_REPORT + startDate + "&EndDate=" + endDate + "&UserId="+userId;
          console.log(WATER_GET_REPORT_WITH_DATES)
          axios.get(WATER_GET_REPORT_WITH_DATES,
  
          )
              .then((response) => {
  
                  if (response.data.isSuccess) {
                      var productsReport: IReportProductItems[] = [];
                      console.log(response.data.result)
                      response.data.result.reportProductItems.forEach((product: any) => {
                          var productReport: IReportProductItems = {
                              productId: product.productId,
                              productName: product.productName,
                              count: product.count,
                          }
                          productsReport.push(productReport)
                      });
                      var reportModel: IReportItem = {
                          totalIncome: response.data.result.totalIncome,
                          totalCost: response.data.result.totalCost,
                          totalPaidAmount: response.data.result.totalPaidAmount,
                          totalRestAmount: response.data.result.totalRestAmount,
                          totalWorkerSalary: response.data.result.totalWorkerSalary,
                          reportProductItems: productsReport,
                          totalFountainCount : response.data.result.totalFountainCount
  
                      }
                      dispatch(Report(reportModel));      
                  }
                  else {
  
                  }
              })
              .catch((err) => {
                  console.log(err)
              });

        }).catch(err => {

        })

     
    }
}


export const loadingProductPie = (loader : boolean) => ({
    type : REPORT_LOADING_PRODUCT_PIE,
    payload: loader
})


export const ReportProductPie = (report: productCountList) => ({
    type: REPORT_GET_PRODUCT_PIE,
    payload: report
})


export const loading = (loader: boolean) => ({
    type: REPORT_LOADING,
    payload: loader
})

export const Report = (report: IReportItem) => ({
    type: REPORT_GET,
    payload: report
})

