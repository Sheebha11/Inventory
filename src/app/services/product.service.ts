import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.interface';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  addProduct(productData: Product | FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData).pipe(
      catchError(error => {
        console.error('❌ Error adding product:', error);
        return throwError(() => new Error('Error adding product'));
      })
    );
  }

  updateProduct(id: number, productData: any): Observable<any> {
    let formData: FormData;
    
    // Check if productData is already FormData
    if (productData instanceof FormData) {
      formData = productData;
    } else {
      formData = new FormData();
      // Convert flat object to FormData
      Object.keys(productData).forEach(key => {
        if (productData[key] !== null && productData[key] !== undefined) {
          if (key === 'latestPODate' && productData[key]) {
            formData.append(key, new Date(productData[key]).toISOString());
          } else {
            formData.append(key, productData[key].toString());
          }
        }
      });
    }

    // Log formData entries for debugging
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
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
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Error fetching products'));
      })
    );
  }
  
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (!response) {
          throw new Error('Product not found');
        }
        return response;
      }),
      catchError(error => {
        console.error('Error fetching product:', error);
        return throwError(() => error);
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