import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.interface';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  addProduct(productData: Product | FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData).pipe(
      catchError(error => {
        console.error('❌ Error adding product:', error);
        return throwError(() => new Error('Error adding product'));
      })
    );
  }

  updateProduct(id: number, product: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
  
    // Append all product fields
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        formData.append(key, product[key]);
      }
    }
  
    // Append image file if provided
    if (imageFile) {
      formData.append('productImage', imageFile);
    }
  
    return this.http.put(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(error => {
        console.error('❌ Error updating product:', error);
        return throwError(() => new Error('Error updating product'));
      })
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('❌ Error getting products:', error);
        return throwError(() => new Error('Error getting products'));
      })
    );
  }
  
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('❌ Error getting product by ID:', error);
        return throwError(() => new Error('Error getting product by ID'));
      })
    );
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      retry(1), // Retry once before failing
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error deleting product:', error);
        
        if (error.status === 0) {
          return throwError(() => new Error('Unable to connect to the server. Please check if the backend is running.'));
        }
        
        if (error.status === 404) {
          return throwError(() => new Error('Product not found in database'));
        }
        
        return throwError(() => new Error('Error deleting product from database'));
      })
    );
  }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`).pipe(
      catchError(error => {
        console.error('❌ Error getting dashboard stats:', error);
        return throwError(() => new Error('Error getting dashboard stats'));
      })
    );
  }
}