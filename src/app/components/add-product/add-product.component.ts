import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import moment from 'moment';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface SubProduct {
  id: number;
  masterName: string;
  materialName: string;
  description: string;
}

interface ProductData {
  [key: string]: string | number | null | File | undefined;
  hsnCode: string;
  Product: string;
  ProductCategory: string;
  uom: string;
  binLocation: string;
  unitPrice: string | number;
  landingChargesPercent: string | number;
  landingCharges: string | number;
  costOfProduct: string | number;
  profitPercent: string | number;
  targetedSellingPrice: string | number;
  gstApplicable: string;
  igstPercent: string | number;
  cgstPercent: string | number;
  sgstPercent: string | number;
  stockKeepingUnit: string;
  latestUnitPrice: string | number;
  latestPODate: string;
  latestPONumber: string;
  openingStock: string | number;
  currentQuantity: string | number;
  thresholdQuantity: string | number;
  stockLevelAlert: string;
  productDescription: string;
  productImage?: File | null;
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
    <div class="product-form-container">
      <h2 class="form-title" style="color: blue; margin-top: 0px;">Add Product</h2>
      
      <form #productForm="ngForm" (ngSubmit)="onSubmit(productForm)">
        <!-- Product Details Container -->
        <div class="product-details-container">
          <h2 class="form-title" style="color: black; margin-top: 0px;">Product 1</h2>
          
          <div class="form-grid">
            <!-- Row 1 -->
            <div class="form-group">
              <label>HSN Code</label>
              <select [(ngModel)]="product.hsnCode" name="hsnCode">
                <option value="">Select HSN Code</option>
                <option value="code1">Code 1</option>
                <option value="code2">Code 2</option>
              </select>
            </div>

            <div class="form-group">
              <label> Master Product</label>
              <input type="text" [(ngModel)]="product.Product" name="masterProduct" 
                     placeholder="Product Name" class="gray-bg">
            </div>

            <div class="form-group">
              <label>ProductCategory</label>
              <input type="text" [(ngModel)]="product.ProductCategory" name="ProductCategory" 
                     placeholder="ProductCategory" class="gray-bg">
            </div>

            <div class="form-group">
              <label>UOM</label>
              <select [(ngModel)]="product.uom" name="uom">
                <option value="">Select UOM</option>
                <option value="kg">Kilogram</option>
                <option value="unit">Unit</option>
              </select>
            </div>

            <div class="form-group">
              <label>Bin Location</label>
              <input type="text" [(ngModel)]="product.binLocation" name="binLocation" 
                     placeholder="Bin Location">
            </div>

            <!-- Row 2 -->
            <div class="form-group">
              <label>Unit Price</label>
              <input type="number" [(ngModel)]="product.unitPrice" name="unitPrice" 
                     placeholder="Enter Unit Price" (input)="calculateValues()">
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

        <!-- Form Actions moved below sub-products -->
        <div class="form-actions">
          <button type="button" (click)="onReset()" class="reset-button">
            Reset Data
          </button>
          <button 
            type="submit" 
            [disabled]="!canSubmit()"
            class="submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
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
  `]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  product: ProductData = {
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
  isEditMode = false;
  editProductId: number | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'edit' && params['id']) {
        this.isEditMode = true;
        this.editProductId = params['id'];
        // Get selected product from localStorage
        const editProductData = localStorage.getItem('editProduct');
        if (editProductData) {
          const productData = JSON.parse(editProductData);
          this.loadEditData(productData);
        }
      }
    });
  }

  loadEditData(productData: any) {
    if (!productData) return;
  
    // Format date from ISO to yyyy-MM-dd
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      } catch {
        return '';
      }
    };

  
    this.product = {
      // ...existing properties...
      hsnCode: productData.hsnCode || '',
      Product: productData.Product || '',
      ProductCategory: productData.ProductCategory || '',
      uom: productData.uom || '',
      binLocation: productData.binLocation || '',
      unitPrice: productData.unitPrice?.toString() || '',
      landingChargesPercent: productData.landingChargesPercent?.toString() || '',
      landingCharges: productData.landingCharges?.toString() || '',
      costOfProduct: productData.costOfProduct?.toString() || '',
      profitPercent: productData.profitPercent?.toString() || '',
      targetedSellingPrice: productData.targetedSellingPrice?.toString() || '',
      gstApplicable: productData.gstApplicable || '',
      igstPercent: productData.igstPercent?.toString() || '',
      cgstPercent: productData.cgstPercent?.toString() || '',
      sgstPercent: productData.sgstPercent?.toString() || '',
      stockKeepingUnit: productData.stockKeepingUnit || '',
      latestUnitPrice: productData.latestUnitPrice?.toString() || '',
      latestPODate: formatDate(productData.latestPODate),
      latestPONumber: productData.latestPONumber || '',
      openingStock: productData.openingStock?.toString() || '',
      currentQuantity: productData.currentQuantity?.toString() || '',
      thresholdQuantity: productData.thresholdQuantity?.toString() || '',
      stockLevelAlert: productData.stockLevelAlert || '',
      productDescription: productData.productDescription || '',
      productImage: null
    };

    // Set image preview if available
    if (productData.imageUrl) {
      this.imagePreviewUrl = productData.imageUrl;
    }

    // Update calculations
    this.calculateValues();
    this.calculateTargetedSellingPrice();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (file) {
      // Save the file
      this.product.productImage = file;
      
      // Create preview URL
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

  /**
   * Calculates landing charges based on unit price and landing charges percentage
   * Also calculates the cost of product (unit price + landing charges)
   */
  calculateValues() {
    if (this.product.unitPrice && this.product.landingChargesPercent) {
      const unitPrice = parseFloat(this.product.unitPrice.toString());
      const landingChargesPercent = parseFloat(this.product.landingChargesPercent.toString());
      
      if (!isNaN(unitPrice) && !isNaN(landingChargesPercent)) {
        // Calculate landing charges
        const landingCharges = (unitPrice * landingChargesPercent) / 100;
        this.product.landingCharges = landingCharges.toFixed(2);
        
        // Calculate cost of product
        const costOfProduct = unitPrice + landingCharges;
        this.product.costOfProduct = costOfProduct.toFixed(2);
        
        // Calculate targeted selling price if profit percentage is set
        this.calculateTargetedSellingPrice();
      }
    }
  }

  /**
   * Calculates targeted selling price based on cost of product and profit percentage
   */
  calculateTargetedSellingPrice() {
    if (this.product.costOfProduct && this.product.profitPercent) {
      const costOfProduct = parseFloat(this.product.costOfProduct.toString());
      const profitPercent = parseFloat(this.product.profitPercent.toString());
      
      if (!isNaN(costOfProduct) && !isNaN(profitPercent)) {
        // Calculate targeted selling price
        const profitAmount = (costOfProduct * profitPercent) / 100;
        const targetedSellingPrice = costOfProduct + profitAmount;
        this.product.targetedSellingPrice = targetedSellingPrice.toFixed(2);
      }
    }
  }

  onSubmit(form: any) {
    if (!this.validateForm()) {
      this.showNotification('Please fill all required fields', 'error');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();

    // Add all non-file fields
    Object.entries(this.product).forEach(([key, value]) => {
      if (key !== 'productImage' && value !== null && value !== undefined && value !== '') {
        formData.append(key, value.toString());
      }
    });

    // Add the file last
    if (this.product.productImage instanceof File) {
      formData.append('productImage', this.product.productImage);
    }

    // Log form data for debugging
    console.log('Form data contents:');
    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    if (this.isEditMode && this.editProductId) {
      this.productService.updateProduct(this.editProductId, formData).subscribe({
        next: (response) => {
          this.showNotification('Product updated successfully!', 'success');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.showNotification(error.message || 'Error updating product', 'error');
          this.isSubmitting = false;
        }
      });
    } else {
      // Add new product
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.showNotification('Product added successfully!', 'success');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.showNotification(error.message || 'Error adding product', 'error');
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  private getNextSerialNumber(): number {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.length + 1;
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-notification'] : ['error-notification']
    });
  }

  onReset() {
    this.product = {
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
    this.subProducts = []; // Clear all temporary data
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

  // Add validation method
  private validateForm(): boolean {
    const requiredFields = [
      'hsnCode',
      'Product',
      'ProductCategory',
      'uom',
      'binLocation',
      'unitPrice',
      'currentQuantity',
      'thresholdQuantity'
    ] as const;

    const isValid = requiredFields.every((field) => {
      const value = this.product[field];
      if (value === null || value === undefined || value === '') {
        console.log(`Missing required field: ${field}`);
        return false;
      }
      
      if (typeof value === 'string' && !value.trim()) {
        console.log(`Empty required field: ${field}`);
        return false;
      }
      
      if (['unitPrice', 'currentQuantity', 'thresholdQuantity'].includes(field)) {
        const numValue = parseFloat(value.toString());
        if (isNaN(numValue) || numValue < 0) {
          console.log(`Invalid numeric value for field: ${field}`);
          return false;
        }
      }
      
      return true;
    });

    if (!isValid) {
      console.log('Form validation failed');
    }

    return isValid;
  }

  // Add method to check if form can be submitted
  canSubmit(): boolean {
    return this.validateForm() && !this.isSubmitting;
  }

  removeItem(index: number) {
    this.subProducts.splice(index, 1);
  }
}