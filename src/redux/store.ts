import { compose, applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";


import {AsyncStorage } from 'react-native'

import reducer from "./reducers";
import loginRed from './reducers/loginReducers'
import HomeReducers from './reducers/homeReducers';
import OrderReducers from "./reducers/orderReducers";
import customerAddReducers from "./reducers/customerAddReducers";
import customerDeleteReducers from "./reducers/customerDeleteReducers";
import customerEditReducers from "./reducers/customerEditReducers";
import productAddReducers from "./reducers/productAddReducers";
import addCashReducers from "./reducers/addCashReducers";
import getProductReducers from "./reducers/getProductReducers";
import productEditReducers from "./reducers/productEditReducers";
import addOrderReducers from "./reducers/addOrderReducers";
import customerPriceGetProductReducers from "./reducers/customerPriceGetProductReducers";
import addCustomerPriceReducers from "./reducers/addCustomerPriceReducers";
import customerDefinedPriceReducers from "./reducers/customerDefinedPriceReducers";
import customerPriceEditReducers from "./reducers/customerPriceEditReducers";
import productForCustomerReducers from "./reducers/productForCustomerReducers";
import editOrderReducers from "./reducers/editOrderReducers";
import employeeReducers from "./reducers/employeeReducers";
import addEmployeeReducers from "./reducers/addEmployeeReducers";
import addUserReducers from "./reducers/addUserReducers";
import deleteEmployeeReducers from "./reducers/deleteEmployeeReducers";
import getUserReducers from "./reducers/getUserReducers";
import reportReducers from "./reducers/reportReducers";

import notificationReducers from './reducers/notificationReducers'
import getEmployeeCostReducers from "./reducers/getEmployeeCostReducers";

import signUpReducers from './reducers/signUpReducers'

import employeeCostReducers from "./reducers/employeeCostReducers";
import editEmployeeReducers from "./reducers/editEmployeeReducers";
import deleteOrderReducers from './reducers/deleteOrderReducers'
import profileReducers from "./reducers/profileReducers";
import deleteEmployeeCostReducers from './reducers/deleteEmployeeCostReducers';
import orderDetailReducers from './reducers/orderDetailReducers'

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  getEmployeeCost: getEmployeeCostReducers,
  report: reportReducers,
  getUser: getUserReducers,
  deleteEmployee: deleteEmployeeReducers,
  addUser: addUserReducers,
  addEmployee: addEmployeeReducers,
  employee: employeeReducers,
  editOrder: editOrderReducers,
  productForCustomer: productForCustomerReducers,
  customerPriceEdit: customerPriceEditReducers,
  customerDefinedPrice: customerDefinedPriceReducers,
  addCustomerPrice: addCustomerPriceReducers,
  customerPriceGetProduct: customerPriceGetProductReducers,
  addOrder: addOrderReducers,
  productEdit: productEditReducers,
  products: getProductReducers,
  addCash: addCashReducers,
  productAdd: productAddReducers,
  customerEdit: customerEditReducers,
  customerDelete: customerDeleteReducers,
  customerAdd: customerAddReducers,
  orders: OrderReducers,
  home: HomeReducers,
  system: reducer,
  login: loginRed,
  signUp : signUpReducers,
  employeeAddCost : employeeCostReducers,
  editEmployeReducer : editEmployeeReducers,
  deleteOrder : deleteOrderReducers,
  profile : profileReducers,
  deleteEmployeeCost : deleteEmployeeCostReducers,
  notification : notificationReducers,
  orderDetail : orderDetailReducers,
  
})


export type AppState = ReturnType<typeof rootReducer>


export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
