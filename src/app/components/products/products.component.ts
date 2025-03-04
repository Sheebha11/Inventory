import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

interface SubProduct {
  id: number;
  materialName: string;
  description: string;
  quantity: number;
  imageUrl?: string;
}

interface DashboardStats {
  requiredReplenished: number;
  sufficientlyStocked: number;
  minMovement: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],

  template: `
    <div class="page-container">
      <!-- Product Dashboard Section -->
      <div class="dashboard-header">
        <h1 class="dashboard-title">Product Dashboard</h1>
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-info">
              <h2 class="stat-number">{{dashboardStats.requiredReplenished}}</h2>
              <p class="stat-label">Required Replenished</p>
            </div>
            <div class="stat-icon">
              <mat-icon>inventory_2</mat-icon>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-info">
              <h2 class="stat-number">{{dashboardStats.sufficientlyStocked}}</h2>
              <p class="stat-label">Sufficiently Stocked</p>
            </div>
            <div class="stat-icon">
              <mat-icon>inventory</mat-icon>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-info">
              <h2 class="stat-number">{{dashboardStats.minMovement}}</h2>
              <p class="stat-label">Min. Movement Products</p>
            </div>
            <div class="stat-icon">
              <mat-icon>low_priority</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider Space -->
      <div class="section-divider"></div>

      <!-- Material List Section -->
      <div class="list-header">
        <h2 class="list-title">Material List</h2>
        
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search Customer ID, Code, Name"
              class="search-input"
            >
            <button class="search-button">
              <mat-icon>search</mat-icon>
            </button>
          </div>

          <button class="filter-button" mat-icon-button>
            <mat-icon>filter_list</mat-icon>
          </button>

          <button 
            class="create-button" 
            mat-raised-button 
            color="primary"
            (click)="navigateToCreate()"
          >
            <mat-icon>add</mat-icon>
            Create Product
          </button>
        </div>
      </div>

      <!-- Material List Table -->
      <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container matColumnDef="sNo">
            <th mat-header-cell *matHeaderCellDef> S No </th>
            <td mat-cell *matCellDef="let element"> {{element.sNo}} </td>
          </ng-container>

          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef> Image </th>
            <td mat-cell *matCellDef="let element">
              <img *ngIf="element.imageUrl" [src]="element.imageUrl" alt="Product image" style="width: 50px; height: 50px; object-fit: cover;">
              <span *ngIf="!element.imageUrl">No image</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="materialName">
            <th mat-header-cell *matHeaderCellDef> Material Name </th>
            <td mat-cell *matCellDef="let element"> {{element.materialName}} </td>
          </ng-container>

          <ng-container matColumnDef="materialCode">
            <th mat-header-cell *matHeaderCellDef> Material Code </th>
            <td mat-cell *matCellDef="let element"> {{element.materialCode}} </td>
          </ng-container>

          <ng-container matColumnDef="materialCategory">
            <th mat-header-cell *matHeaderCellDef> Material Category </th>
            <td mat-cell *matCellDef="let element"> {{element.materialCategory}} </td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef> Description </th>
            <td mat-cell *matCellDef="let element"> {{element.description}} </td>
          </ng-container>

          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef> Quantity </th>
            <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
          </ng-container>

          <ng-container matColumnDef="unitOfMeasurement">
            <th mat-header-cell *matHeaderCellDef> Unit of Measurement </th>
            <td mat-cell *matCellDef="let element"> {{element.unitOfMeasurement}} </td>
          </ng-container>

          <ng-container matColumnDef="locationId">
            <th mat-header-cell *matHeaderCellDef> Location ID </th>
            <td mat-cell *matCellDef="let element"> {{element.locationId}} </td>
          </ng-container>

          <ng-container matColumnDef="dateAdded">
            <th mat-header-cell *matHeaderCellDef> Date Added </th>
            <td mat-cell *matCellDef="let element"> {{element.dateAdded}} </td>
          </ng-container>

          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef> Action </th>
            <td mat-cell *matCellDef="let row; let i = index">
              <div class="action-buttons">
                <button mat-icon-button color="primary" (click)="onEdit(row)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteRow(i, row)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <div class="image-upload-container">
        <img *ngIf="imagePreviewUrl" [src]="imagePreviewUrl" class="image-preview" alt="Preview">
        <div class="upload-btn-wrapper">
          <button class="upload-btn">Upload Product Image</button>
          <input type="file" (change)="onFileSelected($event)" accept="image/*">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background: #f8f9fa;
      max-width: 1200px;
      margin: 0auto;
      padding: 0 24px 16px 24px;
      margin-top: -10px; /* Added negative margin to reduce space from top */
    }

    .dashboard-header {
      display: flex;
      align-items: center;
      padding: 4px 10px; /* Reduced top/bottom padding */
      background: white;
      border-bottom: 5px solid #eee;
      margin-top: 0; /* Removed any top margin */
    }

    .dashboard-title {
      color: #4267B2;
      font-size: 18px;
      margin: 0;
      font-weight: 500;
      white-space: nowrap;
      margin-right: 20px;
      padding: 4px 0; /* Added minimal padding to maintain some spacing */
    }

    .stats-container {
      display: flex;
      gap: 70px;
      flex-wrap: wrap;
      padding: 4px 0; /* Added minimal padding to maintain some spacing */
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 8px; /* Reduced padding */
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      border: 1px solid #eee;
      width: 220px;
      flex: 1;
      min-width: 180px;
    }

    .stat-info {
      flex: 1;
    }

    .stat-number {
      font-size: 16px; /* Font size for number */
      font-weight: 600;
      color: #333;
      margin: 0 0 4px 0;
    }

    .stat-label {
      color: #666;
      margin: 0;
      font-size: 12px; /* Font size for label */
      white-space: nowrap;
    }

    .stat-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }

    .stat-icon mat-icon {
      color: #4267B2;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .section-divider {
      height: 20px;
      background: #f8f9fa;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: white;
      border-bottom: 1px solid #eee;
    }

    .list-title {
      color: #4267B2;
      font-size: 18px;
      margin: 0;
      font-weight: 500;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .search-box {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .search-input {
      border: none;
      padding: 8px 12px;
      width: 200px;
      font-size: 10px;
      outline: none;
    }

    .search-button {
      background: #4267B2;
      border: none;
      color: white;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .filter-button {
      color: #666;
    }

    .create-button {
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .create-button mat-icon {
      font-size: 14px;
      height: 20px;
      width: 20px;
    }

    .table-container {
      padding: 0 10px;
      background: white;
      overflow-x: auto;
    }

    .material-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 3px;
    }

    .material-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      color: #666;
      font-weight: 500;
      border-bottom: 1px solid #eee;
    }

    .material-table td {
      padding: 12px;
      border-bottom: -1px solid #eee;
      color: #333;
    }

    .material-link {
      color: #4267B2;
      text-decoration: none;
    }

    .material-link:hover {
      text-decoration: underline;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .icon-btn.edit {
      color: #4267B2;
    }

    .icon-btn.delete {
      color: #dc3545;
    }

    .action-icons {
      display: flex;
      gap: 10px;
    }

    @media (max-width: 1200px) {
      .dashboard-header {
        flex-wrap: wrap;
      }

      .dashboard-title {
        margin-bottom: 14px;
        width: 100%;
      }

      .stats-container {
        justify-content: flex-start;
      }
    }

    @media (max-width: 968px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .dashboard-title {
        margin-bottom: 16px;
      }

      .stat-card {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .header-actions {
        width: 100%;
        flex-wrap: wrap;
      }

      .search-box {
        flex: 1;
      }

      .search-input {
        width: 100%;
      }
    }

    .product-dashboard {
       margin-top: -8px; /* Reduced the gap between bottom margin and dashboard top */
    }

    .container {
      font-size: 16px; /* Existing font size */
    }

    .image-upload-container {
      margin: 20px 0;
      text-align: center;
    }

    .image-preview {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .upload-btn-wrapper {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }

    .upload-btn {
      border: 2px solid gray;
      color: gray;
      background-color: white;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    .upload-btn-wrapper input[type=file] {
      font-size: 100px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }

    .selected-row {
      background-color: #f5f5f5;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .action-buttons button {
      min-width: 36px;
      padding: 0;
      line-height: 36px;
    }

    .action-buttons .mat-icon {
      font-size: 20px;
    }

    .action-buttons button[color="primary"] {
      color: #1976d2;
    }

    .action-buttons button[color="warn"] {
      color: #dc3545;
    }
  `]
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'materialName',
    'materialCode',
    'materialCategory',
    'description',
    'quantity',
    'unitOfMeasurement',
    'locationId',
    'dateAdded',
    'action'
  ];
  
  dataSource: any[] = [];
  materials: any[] = [];
  dashboardStats = {
    requiredReplenished: 0,
    sufficientlyStocked: 0,
    minMovement: 0
  };

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.dataSource = products.map((product: any, index: number) => ({
          sNo: index + 1,
          materialName: product.materialName || product.Product,
          materialCode: product.materialCode || product.hsnCode,
          materialCategory: product.materialCategory || product.ProductCategory,
          description: product.description || product.productDescription,
          quantity: product.quantity || product.currentQuantity,
          unitOfMeasurement: product.unitOfMeasurement || product.uom,
          locationId: product.locationId || product.binLocation,
          dateAdded: new Date(product.dateAdded).toLocaleDateString(),
          id: product.id,
          thresholdQuantity: product.thresholdQuantity,
          stockLevelAlert: product.stockLevelAlert
        }));

        this.materials = this.dataSource;

        console.log('Products loaded from localStorage:', this.dataSource);
        this.updateDashboardStats();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.showNotification('Error loading products', 'error');
      }
    });
  }

  updateDashboardStats() {
    const products = this.dataSource;
    
    this.dashboardStats = {
      requiredReplenished: products.filter(p => p.quantity < (p.thresholdQuantity || 0)).length,
      sufficientlyStocked: products.filter(p => p.quantity >= (p.thresholdQuantity || 0)).length,
      minMovement: products.filter(p => p.stockLevelAlert === 'Low').length
    };
  }

  navigateToCreate() {
    console.log('Navigating to create product');
    this.router.navigate(['/add-product']);
  }

  onEdit(row: any) {
    console.log('Editing row:', row);
    this.router.navigate(['/edit-product', row.id]);
  }

  deleteRow(index: number, row: any) {
    if (confirm(`Are you sure you want to delete ${row.materialName}?`))  {
      // First, remove from local array
      this.dataSource = this.dataSource.filter((_, idx) => idx !== index);
      
      // Update serial numbers
      this.dataSource = this.dataSource.map((item, idx) => ({
        ...item,
        sNo: idx + 1
      }));

      // Update localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = products.filter((product: any) => product.id !== row.id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Update materials array
      this.materials = this.dataSource;

      // Update dashboard stats
      this.updateDashboardStats();

      // Show success message
      this.showNotification('Product deleted successfully', 'success');

      // Refresh the table data
      this.loadProducts();
    }
  }

  onDelete() {
    const selectedItems = this.dataSource.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      alert('Please select an item to delete');
      return;
    }

    if (confirm('Are you sure you want to delete the selected item(s)?')) {
      // Remove selected items from dataSource
      this.dataSource = this.dataSource.filter(item => !item.selected);
      
      // Update serial numbers
      this.dataSource = this.dataSource.map((item, index) => ({
        ...item,
        sNo: index + 1
      }));

      // Show success message
      alert('Selected items deleted successfully');
      
      // Update dashboard stats
      this.updateDashboardStats();
    }
  }

  selectRow(row: any) {
    // Clear previous selections
    this.dataSource.forEach(item => item.selected = false);
    // Select the clicked row
    row.selected = true;
  }

  private showNotification(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      alert(message);
    } else {
      alert('Error: ' + message);
    }
  }
}