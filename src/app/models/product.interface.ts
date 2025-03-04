export interface Product {
  masterProduct: string;
  hsnCode: string;
  uom: string;
  category: string;
  sku: string;
  unitPrice: number;
  landingChargesPercentage: number;
  landingCharges: number;
  costOfProduct: number;
  profitPercentage: number;
  targetedSellingPrice: number;
  gstApplicable: boolean;
  igstPercentage: number;
  cgstPercentage: number;
  sgstPercentage: number;
  latestUnitPrice: number;
  productDescription: string;
  productImage: string;
  latestPODate: Date;
  latestPONumber: string;
  openingStock: number;
  currentQty: number;
  thresholdQuantity: number;
  stockLevel: number;
} 