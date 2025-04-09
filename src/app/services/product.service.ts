import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/products'; // adjust this to your API URL

  constructor(private http: HttpClient) {}

  // Updated method to handle both Product and FormData
  addProduct(productData: Product | FormData): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/products', productData).pipe(
      catchError(error => {
        console.error('❌ Error adding product:', error);
        return throwError(() => new Error('Error adding product'));
      })
    );
  }

  // Method specifically for file upload with FormData
  addProductWithImage(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/upload`, formData, {
      // Optional: Configure headers if needed
      // headers: { 'Content-Type': 'multipart/form-data' }
    }).pipe(
      catchError(error => {
        console.error('❌ Error adding product with image:', error);
        return throwError(() => new Error('Error adding product with image'));
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
  
    // Append image file if provided (new image selected)
    if (imageFile) {
      formData.append('productImage', imageFile);
    } else {
      // If no new image is selected, pass the existing image URL
      formData.append('existingImageUrl', product.imageUrl);
    }
  
    return this.http.put(`http://localhost:3000/api/products/${id}`, formData);
  }
  
  

  // Rest of the methods remain the same...
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/products').pipe(
      catchError(error => {
        console.error('❌ Error getting products:', error);
        return throwError(() => new Error('Error getting products'));
      })
    );
  }
  
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/products/${id}`).pipe(
      catchError(error => {
        console.error('❌ Error deleting product:', error);
        return throwError(() => new Error('Error deleting product'));
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
          Number(p.quantity) <= Number(p.thresholdQuantity)
        ).length
      };
      return of(stats);
    } catch (error) {
      console.error('❌ Error getting dashboard stats:', error);
      return throwError(() => new Error('Error getting dashboard stats'));
    }
  }
}