import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

interface SubProduct {
  id: number;
  masterName: string;
  materialName: string;
  description: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  template: `
    <!-- Main Add Product Container -->
    <div class="main-container">
      <div class="header-container">
        <h2 class="form-title" style="color: blue; margin-top: 0px;">{{ isEditMode ? 'Edit Product' : 'Add Product' }}</h2>
        <button class="back-button" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back
        </button>
      </div>
      
      <form #productForm="ngForm" (ngSubmit)="onSubmit(productForm)">
        <!-- Product 1 Container Box -->
        <div class="product-container">
          <div class="product-header">
            <h2 class="form-title" style="color: black; margin-top: 0px;">Product 1</h2>
          </div>

          <!-- Product Details Container -->
          <div class="product-details-container">
            <div class="form-grid">
              <!-- Row 1 -->
              <div class="form-group">
                <label>HSN Code</label>
                <input type="text" [(ngModel)]="product.hsnCode" name="hsnCode" required>
              </div>

              <div class="form-group">
                <label> Master Product</label>
                <input type="text" [(ngModel)]="product.Product" name="masterProduct" 
                       placeholder="Product Name" class="gray-bg" required>
              </div>

              <div class="form-group">
                <label>ProductCategory</label>
                <input type="text" [(ngModel)]="product.ProductCategory" name="ProductCategory" 
                       placeholder="ProductCategory" class="gray-bg" required>
              </div>

              <div class="form-group">
                <label>UOM</label>
                <input type="text" [(ngModel)]="product.uom" name="uom" required>
              </div>

              <div class="form-group">
                <label>Bin Location</label>
                <input type="text" [(ngModel)]="product.binLocation" name="binLocation" 
                       placeholder="Bin Location" required>
              </div>

              <!-- Row 2 -->
              <div class="form-group">
                <label>Unit Price</label>
                <input type="number" [(ngModel)]="product.unitPrice" name="unitPrice" 
                       placeholder="Enter Unit Price" (input)="calculateValues()" required>
              </div>

              <div class="form-group">
                <label>Landing Charges %</label>
                <input type="number" [(ngModel)]="product.landingChargesPercent" name="landingChargesPercent" 
                       placeholder="Enter Percentage Value" (input)="calculateValues()">
              </div>

              <div class="form-group">
                <label>Landing Charges</label>
                <input type="number" [(ngModel)]="product.landingCharges" name="landingCharges" 
                       placeholder="Enter Charges Value" readonly class="calculated-field">
              </div>

              <div class="form-group">
                <label>Cost Of Product</label>
                <input type="number" [(ngModel)]="product.costOfProduct" name="costOfProduct" 
                       placeholder="Enter Product Cost" readonly class="calculated-field">
              </div>

              <div class="form-group">
                <label>Profit %</label>
                <input type="number" [(ngModel)]="product.profitPercent" name="profitPercent" 
                       placeholder="Enter Percentage" (input)="calculateTargetedSellingPrice()">
              </div>

              <!-- Row 3 -->
              <div class="form-group">
                <label>Targeted Selling Price</label>
                <input type="number" [(ngModel)]="product.targetedSellingPrice" name="targetedSellingPrice" 
                       placeholder="Selling Price" readonly class="calculated-field">
              </div>

              <div class="form-group">
                <label>GST Applicable</label>
                <select [(ngModel)]="product.gstApplicable" name="gstApplicable">
                  <option value="">Select GST Applicable</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div class="form-group">
                <label>IGST %</label>
                <input type="number" [(ngModel)]="product.igstPercent" name="igstPercent" 
                       placeholder="Enter Percentage Value">
              </div>

              <div class="form-group">
                <label>CGST %</label>
                <input type="number" [(ngModel)]="product.cgstPercent" name="cgstPercent" 
                       placeholder="Enter Percentage Value">
              </div>

              <div class="form-group">
                <label>SGST %</label>
                <input type="number" [(ngModel)]="product.sgstPercent" name="sgstPercent" 
                       placeholder="Enter Percentage Value">
              </div>

              <!-- Row 4 -->
              <div class="form-group">
                <label>Stock Keeping Unit</label>
                <input type="text" [(ngModel)]="product.stockKeepingUnit" name="stockKeepingUnit" 
                       placeholder="Enter Stock Keeping Unit">
              </div>

              <div class="form-group">
                <label>Latest Unit Price</label>
                <input type="number" [(ngModel)]="product.latestUnitPrice" name="latestUnitPrice" 
                       placeholder="Enter Unit Price">
              </div>

              <div class="form-group">
                <label>Latest PO Date</label>
                <input type="date" [(ngModel)]="product.latestPODate" name="latestPODate">
              </div>

              <div class="form-group">
                <label>Latest PO Number</label>
                <input type="text" [(ngModel)]="product.latestPONumber" name="latestPONumber" 
                       placeholder="Enter PO Number">
              </div>

              <div class="form-group">
                <label>Opening Stock</label>
                <input type="number" [(ngModel)]="product.openingStock" name="openingStock" 
                       placeholder="Enter Opening Stock Count">
              </div>

              <!-- Row 5 -->
              <div class="form-group">
                <label>Current Quantity</label>
                <input type="number" [(ngModel)]="product.currentQuantity" name="currentQuantity" 
                       placeholder="Enter Current Quantity Count">
              </div>

              <div class="form-group">
                <label>Threshold Quantity</label>
                <input type="number" [(ngModel)]="product.thresholdQuantity" name="thresholdQuantity" 
                       placeholder="Enter Threshold Quantity">
              </div>

              <div class="form-group">
                <label>Stock Level Alert</label>
                <select [(ngModel)]="product.stockLevelAlert" name="stockLevelAlert">
                  <option value="">Select Level Alert</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div class="form-group span-2">
                <label>Product Description</label>
                <input type="text" [(ngModel)]="product.productDescription" name="productDescription" 
                       placeholder="Enter Product Description">
              </div>
            </div>
              
            <div class="images-subproduct-container">
              <label>Product Images</label>
              <div class="image-upload-row">
                <div class="image-upload-container">
                  <!-- Show image preview if available -->
                  <img *ngIf="imagePreviewUrl" [src]="imagePreviewUrl" class="image-preview" alt="Product preview">
                  
                  <!-- Show upload UI if no image -->
                  <div class="upload-content" *ngIf="!imagePreviewUrl">
                    <mat-icon>cloud_upload</mat-icon>
                    <p>Browse and choose the image you want to upload from your computer</p>
                    <input type="file" #fileInput hidden (change)="onFileSelected($event)" accept="image/*">
                    <button type="button" (click)="fileInput.click()" class="upload-button">
                      Choose File
                    </button>
                  </div>

                  <!-- Show remove button if image exists -->
                  <button *ngIf="imagePreviewUrl" 
                          type="button" 
                          class="remove-image-button"
                          (click)="removeImage()">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                <button type="button" (click)="addSubProduct()" class="add-sub-product-button" style="margin-left: 10px;">
                  Master Name <span class="plus-icon">+</span>
                </button>
              </div>
            </div>
          </div><!-- End Product Details Container -->
          
          <div class="sub-products-container" *ngIf="showSubProducts">
            <table class="sub-products-table">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Master Name</th>
                  <th>Sub Material Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of subProducts; let i = index">
                  <td>{{i + 1}}</td>
                  <td>
                    <input 
                      type="text" 
                      [value]="item.masterName"
                      class="editable-input master-name"
                      readonly
                      disabled
                    >
                  </td>
                  <td>
                    <input 
                      type="text" 
                      [(ngModel)]="item.materialName" 
                      name="materialName{{i}}" 
                     
                      placeholder="Enter material name">
                  </td>
                  <td>
                    <input 
                      type="text" 
                      [(ngModel)]="item.description" 
                      name="description{{i}}" 
                      class="editable-input"
                      placeholder="Enter description">
                  </td>
                  <td>
                    <button class="delete-button" (click)="deleteSubProduct(item.id)">
                      <mat-icon class="delete-icon">delete</mat-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Add New button and input section -->
            <div class="add-new-section">
              <div class="add-new-container">
                <button class="add-new-button" (click)="addNewSubProduct()">
                  Add New <span class="plus-icon">+</span>
                </button>
              </div>

              <!-- Input box that appears when Add New is clicked -->
              <div *ngIf="showNewInput" class="new-item-input-container">
                <input 
                  type="text" 
                  [(ngModel)]="newItemName"
                  placeholder="Enter item name"
                  class="new-item-input"
                  (keyup.enter)="saveNewItem()"
                >
                <div class="button-group">
                  <button (click)="saveNewItem()" class="save-btn">Save</button>
                  <button (click)="cancelNewItem()" class="cancel-btn">Cancel</button>
                </div>
              </div>

              <!-- Display added items -->
              <div class="items-list">
                <div *ngFor="let item of subProducts; let i = index" class="item-row">
                  <span>{{ item }}</span>
                  <button (click)="removeItem(i)" class="remove-btn">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions moved below sub-products -->
        <div class="form-actions">
          <button type="button" (click)="onReset()" class="reset-button">
            Reset Data
          </button>
          <button 
            type="submit" 
            [disabled]="!canSubmit()"
            class="submit-button">
            {{ isEditMode ? 'Update Product' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .main-container {
      background-color: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .product-container {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 20px;
      margin: 15px 0;
    }

    .product-header {
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }

    .product-form-container {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .form-title {
      font-size: 1rem;
      margin-bottom: 2rem;
      font-weight: bold;
      text-align: left;
    }

    /* Product Details Container Styles */
    .product-details-container {
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      background-color: #f9fafb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .images-subproduct-container {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
    }

    .image-section {
      position: relative;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
    }

    .gray-bg {
      background-color: #f3f4f6;
    }

    /* Style for calculated fields */
    .calculated-field {
      background-color: #f3f4f6;
      color: #4B5563;
      cursor: not-allowed;
    }

    .image-upload-row {
      display: flex;
      align-items: flex-start;
      gap: 0.25rem;
      width: 100%;
    }

    .image-upload-container {
      border: 2px dashed #e2e8f0;
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 250px;
      height: 250px;
      overflow: hidden;
    }

    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      height: 100%;
      justify-content: center;
    }

    .remove-image-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .remove-image-button:hover {
      background-color: #f3f4f6;
    }

    .remove-image-button mat-icon {
      color: #EF4444;
      font-size: 20px;
    }

    .upload-button {
      padding: 0.5rem 1rem;
      background-color: #3B82F6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .upload-button:hover {
      background-color: #2563EB;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .reset-button {
      padding: 0.5rem 1rem;
      background-color: transparent;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .submit-button {
      padding: 0.5rem 1rem;
      background-color: #1a56db;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .submit-button:hover {
      background-color: #1e40af;
    }

    /* Sub Products Styles */
    .sub-products-container {
      margin-top: 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .sub-products-table {
      width: 100%;
      border-collapse: collapse;
    }

    .sub-products-table th {
      padding: 1rem;
      text-align: left;
      font-weight: 500;
      color: #4B5563;
      border-bottom: 1px solid #E5E7EB;
    }

    .sub-products-table td {
      padding: 1rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .material-name {
      color: #2563EB;
    }

    .delete-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .delete-icon {
      color: #EF4444;
    }

    .add-new-container {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
    }

    .add-new-button {
      background-color: #2563EB;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .add-new-button:hover {
      background-color: #1D4ED8;
    }

    .plus-icon {
      font-size: 1.25rem;
      font-weight: bold;
    }

   .add-sub-product-button {
    background-color: #3B82F6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 0;
    margin-top: auto;
    }

    .add-sub-product-button:hover {
      background-color: #1D4ED8;
    }

    .editable-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      background-color: white;
    }

    .editable-input:focus {
      outline: none;
      border-color: #3B82F6;
      box-shadow: 0 0 0 1px #3B82F6;
    }

    .sub-products-table td {
      padding: 0.5rem;
      border-bottom: 1px solid #E5E7EB;
      min-width: 120px;
    }

    .image-preview {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 0.375rem;
    }

    .form-field-error {
      color: #dc2626;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    input.ng-invalid.ng-touched,
    select.ng-invalid.ng-touched {
      border-color: #dc2626;
    }

    .save-button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .master-name {
      background-color: #f3f4f6;
      color: #4B5563;
      cursor: not-allowed;
    }

    .master-name:disabled {
      border: 1px solid #e5e7eb;
    }

    .add-new-section {
      margin: 20px 0;
    }

    .add-new-container {
      margin-bottom: 10px;
    }

    .add-new-button {
      background-color: #4267B2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .plus-icon {
      font-size: 16px;
      font-weight: bold;
    }

    .new-item-input-container {
      margin-top: 10px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }

    .new-item-input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .button-group {
      display: flex;
      gap: 10px;
    }

    .save-btn, .cancel-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .save-btn {
      background-color: #4CAF50;
      color: white;
    }

    .cancel-btn {
      background-color: #f44336;
      color: white;
    }

    .items-list {
      margin-top: 10px;
    }

    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
      margin-bottom: 5px;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #f44336;
      cursor: pointer;
      font-size: 18px;
      padding: 0 5px;
    }

    .remove-btn:hover {
      color: #d32f2f;
    }

    .span-2 {
      grid-column: span 2;
    }

    /* Add these new styles */
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 16px;
      background-color: rgb(38, 48, 184);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      transition: background-color 0.3s;
    }

    .back-button:hover {
      background-color: rgb(31, 39, 145);
      color: white;
    }

    /* Custom Notification Styles */
    ::ng-deep .custom-notification {
      margin-top: 100px !important;
      min-width: 400px !important;
    }

    ::ng-deep .success-notification {
      background-color: white !important;
      color: black !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    }

    ::ng-deep .success-notification .mat-mdc-snack-bar-label {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      font-size: 16px !important;
    }

    ::ng-deep .success-notification .mat-mdc-snack-bar-label::before {
      content: '' !important;
      display: inline-block !important;
      width: 24px !important;
      height: 24px !important;
      background-color: #1976d2 !important;
      border-radius: 50% !important;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>') !important;
      background-size: 16px !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }

    ::ng-deep .success-notification .mdc-snackbar__surface {
      background-color: white !important;
      color: black !important;
      padding: 14px 20px !important;
      border-radius: 4px !important;
    }

    ::ng-deep .success-notification .mat-mdc-snack-bar-actions {
      padding: 0 !important;
      margin: 0 !important;
    }

    ::ng-deep .success-notification .mdc-button {
      color: #1976d2 !important;
    }

    ::ng-deep .error-notification {
      background-color: #f44336 !important;
      color: white !important;
    }
  `]
})
export class AddProductComponent implements OnInit {
  product: any = {
    id: null,
    hsnCode: '',
    Product: '',
    ProductCategory: '',
    uom: '',
    binLocation: '',
    unitPrice: '',
    landingChargesPercent: '',
    landingCharges: '',
    costOfProduct: '',
    profitPercent: '',
    targetedSellingPrice: '',
    gstApplicable: '',
    igstPercent: '',
    cgstPercent: '',
    sgstPercent: '',
    stockKeepingUnit: '',
    latestUnitPrice: '',
    latestPODate: '',
    latestPONumber: '',
    openingStock: '',
    currentQuantity: '',
    thresholdQuantity: '',
    stockLevelAlert: '',
    productDescription: '',
    productImage: null
  };

  subProducts: SubProduct[] = [];
  temporaryProducts: any[] = [];
    
  showSubProducts = false;
  imagePreviewUrl: string | null = null;
  isSubmitting = false;
  isLoading = false;
  showNewInput: boolean = false;
  newItemName: string = '';
  isEditMode: boolean = false;
  productId: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['product']) {
        this.product = JSON.parse(params['product']);
        this.productId = this.product.id;
        this.isEditMode = true;
      }
    });
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (file) {
      this.product.productImage = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.product.productImage = null;
    this.imagePreviewUrl = null;
  }

  calculateValues() {
    if (this.product.unitPrice && this.product.landingChargesPercent) {
      const unitPrice = parseFloat(this.product.unitPrice);
      const landingChargesPercent = parseFloat(this.product.landingChargesPercent);
      
      if (!isNaN(unitPrice) && !isNaN(landingChargesPercent)) {
        const landingCharges = (unitPrice * landingChargesPercent) / 100;
        this.product.landingCharges = landingCharges.toFixed(2);
        
        const costOfProduct = unitPrice + landingCharges;
        this.product.costOfProduct = costOfProduct.toFixed(2);
      }
    }
  }

  calculateTargetedSellingPrice() {
    if (this.product.costOfProduct && this.product.profitPercent) {
      const costOfProduct = parseFloat(this.product.costOfProduct);
      const profitPercent = parseFloat(this.product.profitPercent);
      
      if (!isNaN(costOfProduct) && !isNaN(profitPercent)) {
        const profitAmount = (costOfProduct * profitPercent) / 100;
        const targetedSellingPrice = costOfProduct + profitAmount;
        this.product.targetedSellingPrice = targetedSellingPrice.toFixed(2);
      }
    }
  }

  onSubmit(form: any) {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId!, this.product).subscribe({
        next: () => {
          this.showNotification('Product updated successfully', 'success');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.showNotification('Error updating product: ' + (err.error?.message || 'Unknown error'), 'error');
        }
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: () => {
          this.showNotification('Product added successfully', 'success');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.showNotification('Error adding product: ' + (err.error?.message || 'Unknown error'), 'error');
        }
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-notification' : 'error-notification'
    });
  }

  onReset() {
    this.product = {
      id: null,
      hsnCode:'',
      Product: '',
      ProductCategory: '',
      uom: '',
      binLocation: '',
      unitPrice: '',
      landingChargesPercent: '',
      landingCharges: '',
      costOfProduct: '',
      profitPercent: '',
      targetedSellingPrice: '',
      gstApplicable: '',
      igstPercent: '',
      cgstPercent: '',
      sgstPercent: '',
      stockKeepingUnit: '',
      latestUnitPrice: '',
      latestPODate: '',
      latestPONumber: '',
      openingStock: '',
      currentQuantity: '',
      thresholdQuantity: '',
      stockLevelAlert: '',
      productDescription: '',
      productImage: null
    };
    this.imagePreviewUrl = null;
    this.subProducts = [];
    this.showSubProducts = false;
  }

  addNewSubProduct() {
    this.showNewInput = true;
  }

  saveNewItem() {
    if (this.newItemName.trim()) {
      this.subProducts.push({
        id: this.subProducts.length + 1,
        masterName: this.product.Product,
        materialName: this.newItemName.trim(),
        description: ''
      });
      this.newItemName = '';
      this.showNewInput = false;
    }
  }

  cancelNewItem() {
    this.newItemName = '';
    this.showNewInput = false;
  }

  deleteSubProduct(id: number) {
    const index = this.subProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.subProducts.splice(index, 1);
      if (this.subProducts.length === 0) {
        this.showSubProducts = false;
      }
    }
  }

  addSubProduct() {
    const newId = Math.max(0, ...this.subProducts.map(p => p.id)) + 1;
    this.subProducts.push({
      id: newId,
      masterName: this.product.Product || 'No Master Name',
      materialName: '',
      description: ''
    });
    this.showSubProducts = true;
  }

  private validateForm(): boolean {
    if (!this.product.Product || 
        !this.product.hsnCode || 
        !this.product.ProductCategory || 
        !this.product.uom || 
        !this.product.binLocation || 
        !this.product.unitPrice || 
        !this.product.currentQuantity || 
        !this.product.thresholdQuantity) {
      return false;
    }

    if (isNaN(Number(this.product.unitPrice)) || 
        isNaN(Number(this.product.currentQuantity)) || 
        isNaN(Number(this.product.thresholdQuantity))) {
      return false;
    }

    if (Number(this.product.unitPrice) <= 0 || 
        Number(this.product.currentQuantity) < 0 || 
        Number(this.product.thresholdQuantity) < 0) {
      return false;
    }

    return true;
  }

  canSubmit(): boolean {
    return this.validateForm() && !this.isSubmitting;
  }

  removeItem(index: number) {
    this.subProducts.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}