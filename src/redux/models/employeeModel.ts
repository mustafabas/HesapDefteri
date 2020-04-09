export interface IEmployeeItem{
    employeeId : number;
    employeeName :string;
    monthlySalary :number;
    createDate: string;
    active:boolean;
    
}
export interface IEmployeeItemResponseModel{
    employeeId : number;
    employeeName :string;
    monthlySalaryDisplay :string;
    createDate: string;
    active:boolean;
    address:string;
    addAsUser:boolean;
    dailyDecimalFoodDisplay:string;
    phoneNumber:string;
    fullShow : boolean,
}

export interface IEmployeeItemBaseResponseModel{
    employeeId : number;
    employeeName :string;
    monthlySalary ?:number;
    active:boolean;
    dailyPriceFood ?: number;
    address : string;
    identityNumber:string;
    phoneNumber:string;
    addAsUser :boolean;
    mail : string;
    password:string;

}