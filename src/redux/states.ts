import { ICustomerItem, ICustomerDetailItem, ICustomerFromPhone } from "./models/homeModel";
import { IOrderItem } from "./models/orderModel";
import { IProductItem} from "./models/productModel";
import {ICustomerPriceProductItem} from "./models/customerPriceProductModel"
import {IDefinedCustomerPriceItem} from "./models/customerDefinedPriceModel"
import {IProductForCustomerItem} from "./models/productForCustomerModel"
import {IEmployeeItem, IEmployeeItemBaseResponseModel} from "./models/employeeModel"
import { IUserItem } from "./models/addUserModel";
import { IGetUserItem} from "./models/userModel";
import {IReportItem } from "./models/reportModel"
import {IEmployeeCostItem} from "./models/employeeCostModel"
import { UserFirstData } from "./reducers/signUpReducers";
import { IProduct } from "./actions/productEditAction";
import { Customer } from "./actions/customerEditAction";
import { productCountList } from "./actions/reportAction";
import { lastOrderInterface } from "./actions/addOrderAction";

export interface State {
    data: any[];
    loading: boolean;
  }

  export interface Action {
    type: string;
    payload: any;
  }
  export interface HomeState{
    customers:ICustomerItem[];
    isHomeLoading :boolean | null;
    customerMoreLoading : boolean,
    detectedCustomer : ICustomerFromPhone | null,
    detectingCustomerLoading : boolean;


}
  export interface UserState {
    isLoading: boolean;
    isFinished: boolean;
    isSucceed: boolean;
    loginErrorMessage : string;


  }
  



  export interface UserCreate {
    isLoading: boolean;
    isFinished: boolean;
    isSucceed: boolean;
    loginErrorMessage : string;
    isSecondLoading : boolean;
    isSecondFinished : boolean;
    isSecondSucceed : boolean;
    isThirdLoading : boolean;
    isThirdFinished : boolean;
    isThirdSucceed : boolean;
    userFirstData : UserFirstData;
  }



  export interface Orders
  {
    orders: IOrderItem[];
    isOrderLoading: boolean | null;
    customerDetail : ICustomerDetailItem;
    isCustomerDetailLoading : boolean;
    loadingMore:boolean;
  }

  export interface CustomerAdd
  {
    isSuccess: boolean,
    CustomerAddMessage: string,
  }

  export interface CustomerDelete
  {
    isLoadingCustomerDelete:boolean;
    isSuccessCustomerDelete: boolean;
    message : string;
    
  }

  export interface CustomerEdit
  {
    isSuccess: boolean;
    CustomerEditMessage: string;
    customer : Customer;
    loading : boolean;

  }

  export interface ProductAdd
  {
    isSuccess: boolean | null;
    ProductAddMessage: string; 
    isAddLoading:boolean;
  }

  export interface AddCash
  {
    isSuccess: boolean,
    AddCashMessage: string,
  }

  export interface ProductState{
    products:IProductItem[];
    isProductLoading :boolean | null;
}

export interface AddOrder
  {
    isSuccess: boolean;
    AddOrderMessage: string;
    isTried : boolean;
    isLoading : boolean;
    lastOrder : lastOrderInterface;
    

  }

  export interface ProductEdit
  {
    
    ProductEditMessage: string,
    product: IProduct;
    loading : boolean;
    isSuccess: boolean;
    Secondloading : boolean;
    SecondisSuccess: boolean;
  }

  export interface CustomerPriceProductState{
    products:ICustomerPriceProductItem[];
    isProductLoading :boolean;
}

export interface AddCustomerPrice
  {
    isSuccess: boolean,
    AddCustomerPriceMessage: string,
  }

  export interface CustomerDefinedPriceState{
    products:IDefinedCustomerPriceItem[];
    isProductLoading :boolean | null;
}

export interface CustomerPriceEdit
{
  isSuccess: boolean,
  CustomerPriceEditMessage: string,
}

export interface ProductForCustomer{
  product:IProductForCustomerItem;
  isLoading :boolean;
}

export interface OrderDelete
  {
    isSuccess: boolean;
    Message: string;
    
  }

  export interface EditOrder
  {
    isSuccess: boolean,
    EditOrderMessage: string,
  }

  
  export interface EmployeeState{
    employees:IEmployeeItem[];
    isLoading :boolean;
}

export interface EmployeeAdd
{
  isSuccess: boolean;
  EmployeeAddMessage: string;
  isLoading:boolean;
}
export interface EmployeeEditRedecurState
{
  isSuccess: boolean;
  EmployeeUpdateMessage: string;
  employee :IEmployeeItemBaseResponseModel;
  isLoading : boolean;
  isLoadignGetEmployee : boolean | null;

}
export interface AddUser
  {
    isSuccess: boolean,
    AddUserMessage: string,
  }

  export interface EmployeeDelete
  {
    isSuccess: boolean | null;
  }

  export interface getUserState{
    user:IGetUserItem;
    isUserLoading :boolean;
}

export interface EmployeeCostAdd
{
  isSuccess: boolean;
  EmployeAddCostLoading:boolean;
  EmployeeCostAddMessage: string;
}

export interface ReportState{
  report:IReportItem;
  isReportLoading :boolean;
  isReportLoadingProductPie : boolean | null;
  reportProductPie :productCountList;
}

export interface GetEmployeeCostState{
  employees:IEmployeeCostItem[];
  isLoading :boolean;
}

export interface EmployeeCostEdit
{
  isSuccess: boolean,
  EmployeeCostAddMessage: string,
}

export interface EmployeeCostDelete
  {
    isSuccess: boolean;
  }