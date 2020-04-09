export interface IOrderItem
{
    orderId:number,
    productId: number,
    unitPrice:number,
    totalPrice:number,
    tookTotalPrice: number,
    restAmount: number,
    count:number,
    productName: string,
    productCode: string,
    dateTime: string,
    isPaid:boolean,
}

