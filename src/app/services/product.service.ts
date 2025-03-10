import { Injectable } from '@angular/core';
import { Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Product {
    id?: number;
    hsnCode: string;
    Product: string;
    ProductCategory: string;
    uom: string;
    binLocation: string;
    unitPrice: number;
    landingChargesPercent: number;
    landingCharges: number;
    costOfProduct: number;
    profitPercent: number;
    targetedSellingPrice: number;
    gstApplicable: boolean;
    igstPercent: number;
    cgstPercent: number;
    sgstPercent: number;
    stockKeepingUnit: string;
    latestUnitPrice: number;
    latestPODate: string;
    latestPONumber: string;
    openingStock: number;
    currentQuantity: number;
    thresholdQuantity: number;
    stockLevelAlert: string;
    productDescription: string;
    productImage: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; // URL to web api

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getDashboardStats(): Observable<any> {
    try {
      return this.http.get<any[]>(this.apiUrl).pipe(
        map(products => ({
          requiredReplenished: products.filter(p => 
            Number(p.quantity) <= Number(p.thresholdQuantity)
          ).length,
          sufficientlyStocked: products.filter(p => 
            Number(p.quantity) > Number(p.thresholdQuantity)
          ).length,
          minMovement: products.filter(p => 
            p.stockLevelAlert === 'low'
          ).length
        })),
        catchError(error => {
          console.error('Error getting dashboard stats:', error);
          return throwError(() => 'Error getting dashboard stats');
        })
      );
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return throwError(() => 'Error getting dashboard stats');
    }
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
} 
