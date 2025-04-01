export interface Product {
  id: number;
  sNo: number;
  materialName: string;
  materialCode: string;
  materialCategory: string;
  description?: string;
  quantity: number;
  unitOfMeasurement: string;
  locationId: string;
  dateAdded: string;
  
  // Pricing fields
  unitPrice: number;
  landingChargesPercent: number;
  landingCharges: number;
  costOfProduct: number;
  profitPercent: number;
  targetedSellingPrice: number;
  
  // GST fields
  gstApplicable: string;
  gstRate: number;
  gstAmount: number;
  
  // Stock management
  currentQuantity: number;
  thresholdQuantity: number;
  reorderQuantity: number;
  maximumQuantity: number;
  stockLevelAlert: string;
  
  // Location and tracking
  binLocation: string;
  stockKeepingUnit: string;
  
  // Purchase info
  latestUnitPrice: number;
  latestPODate: string;
  latestPONumber: string;
  openingStock: number;
  
  // Optional fields
  imageUrl?: string;
  subProducts?: any[];
  sellingPrice: number;
  minimumSellingPrice: number;
}