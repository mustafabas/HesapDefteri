
export interface ICustomerItem{
    customerId : number;
    nameSurname :string;
    companyName :string;
    displayTotalAmount:string;
    totalAmount:number;
    displayRestTotalAmount:string;
    restTotalAmount:number;
    displayTookTotalAmount:string;
    dayOfWeek ? : number;
    fountainCount?: number;
    dayOfWeeks?:string;

}

export interface ICustomerFromPhone {
    id :number;
    customerName: string;
    detected : boolean;
  }

export interface ICustomerDetailItem extends  ICustomerItem{
    adress?:string;
    phoneNumber?:string;
    totalOrderCount : string;
    
}