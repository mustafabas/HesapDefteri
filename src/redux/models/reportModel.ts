
export interface IReportItem{
    totalIncome : number;
    totalCost :number;
    totalPaidAmount :number;
    totalRestAmount:number;
    totalWorkerSalary:number;
    reportProductItems:IReportProductItems[];
    totalFountainCount : number;
    
}

export interface IReportProductItems{
    productId:number;
    productName:string;
    count:number;
}
