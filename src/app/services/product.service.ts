import { Injectable } from '@angular/core';
import { Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api'; // adjust this to your API URL

  constructor(private http: HttpClient) {}

  addProduct(productData: any): Observable<any> {
    try {
      const newProduct = {
        ...productData,
        id: Date.now(),
        dateAdded: new Date().toISOString(),
        materialName: productData.Product,
        materialCode: productData.hsnCode,
        materialCategory: productData.ProductCategory,
        description: productData.productDescription,
        quantity: productData.currentQuantity,
        unitOfMeasurement: productData.uom,
        locationId: productData.binLocation
      };

      const products = JSON.parse(localStorage.getItem('products') || '[]');
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      
      console.log('Product saved to localStorage:', newProduct);
      return of(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      return throwError(() => 'Error adding product');
    }
  }

  getProducts(): Observable<any[]> {
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      return of(products);
    } catch (error) {
      console.error('Error getting products:', error);
      return throwError(() => 'Error getting products');
    }
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        throw error;
      })
    );
  }

  getDashboardStats(): Observable<any> {
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const stats = {
        requiredReplenished: products.filter((p: any) => 
          Number(p.quantity) <= Number(p.thresholdQuantity)
        ).length,
        sufficientlyStocked: products.filter((p: any) => 
          Number(p.quantity) > Number(p.thresholdQuantity)
        ).length,
        minMovement: products.filter((p: any) => 
          p.stockLevelAlert === 'low'
        ).length
      };
      return of(stats);
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return throwError(() => 'Error getting dashboard stats');
    }
  }
}