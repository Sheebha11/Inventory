import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Brand from '../../types/brand';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor() {}
  httpClient= inject(HttpClient);
  getBrands() {
    return this.httpClient.get<Brand[]>( environment.apiUrl+'/brands');

  }

  addBrand(brand:Brand) {
    return this.httpClient.post<Brand>( environment.apiUrl+'/brands',  brand);
  }
  
  getBrand(brandId:string) {
    return this.httpClient.get<Brand>( environment.apiUrl+'/brands/'+ brandId);
 } 
  updateBrand(brand: Brand): Observable<any> {
    return this.httpClient.put<Brand>( environment.apiUrl+'/brands/' + brand.id, brand);
  }
}

