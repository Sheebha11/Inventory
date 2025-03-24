export interface Product {
  hsnCode: string;
  masterProduct: string;
  category: string;
  uom: string;
  unitPrice: number;
  landingChargesPercent: number;
  costOfProduct: number;
  gstApplicable: string;
  currentQuantity: number;
  thresholdQuantity: number;
}