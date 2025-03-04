export default interface Order{
    id: string,
    name:string;
    productId:string,
    quantity:number,
    SalePrice:number,
    discount:number,
    totalAmount:number,
    totalOrder:number,
    validityDate:Date,
    expiryDate:Date
    
}