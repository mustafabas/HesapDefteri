
import axios from 'axios'
import {WATER_CUSTOMER_ORDERS_GET, WATER_CUSTOMER_ORDERS_GET_DETAIL} from './../constants'
import { Dispatch } from "react";
import {ORDERS_GET,ORDER_LOADING,GET_TAKE_TOTAL_AMOUNT,GET_TOOK_TOTAL_AMOUNT,GET_REST_TOTAL_AMOUNT, ORDERS_GET_MORE, ORDER_LOADING_MORE, CUSTOMER_DETAIL, CUSTOMER_DETAIL_LOADING } from './../types'
import {Action} from '../states'
import { IOrderItem } from "../models/orderModel";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { ICustomerDetailItem } from "../models/homeModel";


export function GetOrders(customerId:number,pageIndex:number,pageSize:number) {

    return (dispatch : Dispatch<Action>) =>  {
  
      dispatch(loading(false,"list"));
    var WATER_CUSTOMER_ORDERS_GET_CUSTOMER =WATER_CUSTOMER_ORDERS_GET+customerId+"&pageIndex="+pageIndex+"&pageSize="+pageSize;

    axios.get(WATER_CUSTOMER_ORDERS_GET_CUSTOMER,

      
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var takeTotal:number = response.data.result.takeTotalAmount;
      var tookTotal:number = response.data.result.tookTotalAmount;
      var restTotal:number = response.data.result.restTotalAmount;
      var orderModel :IOrderItem[] = [];
      response.data.result.orderItems.forEach((order:any) => {
            var orderItem : IOrderItem={
                    orderId : order.orderId,
                    productId: order.productId,
                    unitPrice :order.unitPrice,
                    totalPrice :order.totalPrice,
                    tookTotalPrice: order.tookTotalPrice,
                    restAmount: order.restAmount,
                    count:order.count,
                    productName: order.productName,
                    productCode: order.productCode,
                    dateTime: order.dateTime,
                    isPaid: order.isPaid,
            }
            orderModel.push(orderItem);         
      });
   
      dispatch(orders(orderModel));
      dispatch(loading(false,"list"));
    }
   
  
  else {
    dispatch(loading(false,"list"));
  }
  })
  .catch((err) => {
    dispatch(loading(false,"list"));
  });


  }

}

export function GetOrdersMore(customerId:number,pageIndex:number,pageSize:number) {

  return (dispatch : Dispatch<Action>) =>  {
    dispatch(loadingMore(true));
 
  var WATER_CUSTOMER_ORDERS_GET_CUSTOMER =WATER_CUSTOMER_ORDERS_GET+customerId+"&pageIndex="+pageIndex+"&pageSize="+pageSize;

  axios.get(WATER_CUSTOMER_ORDERS_GET_CUSTOMER,

    
  )
.then((response) =>{
  
if(response.data.isSuccess){

    var takeTotal:number = response.data.result.takeTotalAmount;
    var tookTotal:number = response.data.result.tookTotalAmount;
    var restTotal:number = response.data.result.restTotalAmount;
    var orderModel :IOrderItem[] = [];
    response.data.result.orderItems.forEach((order:any) => {
          var orderItem : IOrderItem={
                  orderId : order.orderId,
                  productId: order.productId,
                  unitPrice :order.unitPrice,
                  totalPrice :order.totalPrice,
                  tookTotalPrice: order.tookTotalPrice,
                  restAmount: order.restAmount,
                  count:order.count,
                  productName: order.productName,
                  productCode: order.productCode,
                  dateTime: order.dateTime,
                  isPaid: order.isPaid,
          }
          orderModel.push(orderItem);         
    });
 
    dispatch(ordersMore(orderModel));
    dispatch(takeTotalAmount(takeTotal));
    dispatch(tookTotalAmount(tookTotal));
    dispatch(restTotalAmount(restTotal));
  }
 

else {

}
})
.catch((err) => {

});


}

}

export function GetCustomerDetail(customerId:number){
  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true,"customerDetail"));
    axios.get(WATER_CUSTOMER_ORDERS_GET_DETAIL+customerId,

    )
  .then((response) =>{
 
  if(response.data.isSuccess){

      var customer = response.data.result;
      const customerDetailModel :ICustomerDetailItem ={
        customerId: customer.customerId,
        companyName: customer.companyName,
        nameSurname: customer.nameSurname,
        displayTotalAmount: customer.displayTotalAmount,
        totalAmount: customer.totalAmount,
        displayRestTotalAmount: customer.displayRestTotalAmount,
        restTotalAmount: customer.restTotalAmount,
        displayTookTotalAmount: customer.displayTookTotalAmount,
        dayOfWeek: customer.dayOfWeek,
        fountainCount: customer.fountainCount,
        dayOfWeeks: customer.dayOfWeeks,
        adress:customer.address,
        phoneNumber:customer.phoneNumber,
        totalOrderCount :customer.totalOrderCount==0 ? "0": customer.totalOrderCount.toString(),

      };
   console.log(customerDetailModel);
      dispatch(customerDetail(customerDetailModel));

    }
   
  
  else {
    dispatch(loading(false,"customerDetail"));
  }
  })
  .catch((err) => {
    console.log(err);

  });


  }
}

export const loading = (loader : boolean, type:string) => ({
    type : type == "list" ?  ORDER_LOADING : CUSTOMER_DETAIL_LOADING,
    payload : loader
  })
  export const loadingMore = (loader : boolean) => ({
    type : ORDER_LOADING_MORE,
    payload : loader
  })
  export const orders = (orders :IOrderItem[] ) => ({
    type : ORDERS_GET,
    payload : orders
  })
  export const customerDetail = (customerDetail :ICustomerDetailItem ) => ({
    type : CUSTOMER_DETAIL,
    payload : customerDetail
  })
  export const ordersMore = (orders :IOrderItem[] ) => ({
    type : ORDERS_GET_MORE,
    payload : orders
  })
  export const takeTotalAmount = (takeTotalAmount :number) => ({
    type : GET_TAKE_TOTAL_AMOUNT,
    payload : takeTotalAmount
  })

  export const tookTotalAmount = (tookTotalAmount:number) => ({
    type : GET_TOOK_TOTAL_AMOUNT,
    payload : tookTotalAmount
  })

  export const restTotalAmount = (restTotalAmount:number ) => ({
    type : GET_REST_TOTAL_AMOUNT,
    payload : restTotalAmount
  })
