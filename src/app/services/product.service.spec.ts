import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbUrl = 'http://localhost:3000/products'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.dbUrl, product);
  }

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.dbUrl);
  }

  // Update a product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.dbUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.dbUrl}/${id}`);
  }
}