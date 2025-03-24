import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrandService } from '../../services/brand.service';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Corrected the property name to `styleUrls`
})
export class HomeComponent {
  totalOrders!: number;
  totalProducts!: number;
  totalBrands!: number;
  brandService = inject(BrandService);
  orderService = inject(OrdersService);
  productService = inject(ProductsService);

  ngOnInit() {
    this.brandService
      .getBrands()
      .subscribe((result) => (this.totalBrands = result.length));
    
    this.orderService
      .getOrders()
      .subscribe((result) => (this.totalOrders = result.length));
    
    this.productService
      .getProducts()
      .subscribe((result) => (this.totalProducts = result.length));
  }
}
