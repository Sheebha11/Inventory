// src/app/services/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedProduct: any;

  constructor() { }

  setSelectedProduct(product: any) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }
}