import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL to your mock API

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Fetch all products
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Add a new user
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  // Update a user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  // Update a product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
