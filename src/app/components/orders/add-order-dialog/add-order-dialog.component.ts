import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../../../services/product.service';
import { Order } from '../../../services/order.service';

@Component({
  selector: 'app-add-order-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="text-xl font-semibold mb-4">
        {{isUpdateMode ? 'Update Order' : 'Create New Order'}}
      </h2>
      
      <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <div class="grid grid-cols-2 gap-4">
            <!-- Order ID -->
            <mat-form-field>
              <mat-label>Order ID</mat-label>
              <input matInput formControlName="orderNumber" placeholder="Order ID" readonly>
              <mat-hint>Auto-generated order number</mat-hint>
            </mat-form-field>

            <!-- Customer Name -->
            <mat-form-field>
              <mat-label>Customer Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter customer name">
              <mat-error *ngIf="orderForm.get('name')?.hasError('required')">
                Customer name is required
              </mat-error>
            </mat-form-field>

            <!-- Product Selection -->
            <mat-form-field>
              <mat-label>Product</mat-label>
              <mat-select formControlName="productId" (selectionChange)="onProductSelect($event)">
                <mat-option *ngFor="let product of products" [value]="product.id">
                  {{product.name}}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="orderForm.get('productId')?.hasError('required')">
                Product selection is required
              </mat-error>
            </mat-form-field>

            <!-- Quantity -->
            <mat-form-field>
              <mat-label>Quantity</mat-label>
              <input matInput type="number" formControlName="quantity" 
                     min="1" max="999"
                     (input)="calculateTotals()">
              <button matSuffix mat-icon-button (click)="incrementQuantity()">
                <mat-icon>add</mat-icon>
              </button>
              <button matPrefix mat-icon-button (click)="decrementQuantity()">
                <mat-icon>remove</mat-icon>
              </button>
              <mat-error *ngIf="orderForm.get('quantity')?.hasError('required')">
                Quantity is required
              </mat-error>
            </mat-form-field>

            <!-- Validity Date -->
            <mat-form-field>
              <mat-label>Validity Date</mat-label>
              <input matInput [matDatepicker]="validityPicker" formControlName="validityDate">
              <mat-datepicker-toggle matIconSuffix [for]="validityPicker"></mat-datepicker-toggle>
              <mat-datepicker #validityPicker></mat-datepicker>
              <mat-error *ngIf="orderForm.get('validityDate')?.hasError('required')">
                Validity date is required
              </mat-error>
            </mat-form-field>

            <!-- Expiry Date -->
            <mat-form-field>
              <mat-label>Expiry Date</mat-label>
              <input matInput [matDatepicker]="expiryPicker" formControlName="expiryDate"
                     [min]="orderForm.get('validityDate')?.value">
              <mat-datepicker-toggle matIconSuffix [for]="expiryPicker"></mat-datepicker-toggle>
              <mat-datepicker #expiryPicker></mat-datepicker>
              <mat-error *ngIf="orderForm.get('expiryDate')?.hasError('required')">
                Expiry date is required
              </mat-error>
            </mat-form-field>

            <!-- Sale Price -->
            <mat-form-field>
              <mat-label>Sale Price</mat-label>
              <input matInput type="number" formControlName="salePrice" readonly>
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>

            <!-- Discount -->
            <mat-form-field>
              <mat-label>Discount</mat-label>
              <input matInput type="number" formControlName="discount" 
                     min="0" max="100"
                     (input)="calculateTotals()">
              <span matSuffix>%</span>
              <mat-error *ngIf="orderForm.get('discount')?.hasError('max')">
                Maximum discount is 100%
              </mat-error>
            </mat-form-field>

            <!-- Total Amount -->
            <mat-form-field>
              <mat-label>Total Amount</mat-label>
              <input matInput type="number" formControlName="totalAmount" readonly>
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>

            <!-- Total Order -->
            <mat-form-field>
              <mat-label>Final Total</mat-label>
              <input matInput type="number" formControlName="totalOrder" readonly>
              <span matPrefix>$&nbsp;</span>
              <mat-hint>After discount</mat-hint>
            </mat-form-field>
          </div>
        </mat-dialog-content>
        
        <mat-dialog-actions align="end" class="mt-6">
          <button mat-button type="button" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="!orderForm.valid">
            {{isUpdateMode ? 'Update Order' : 'Create Order'}}
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    mat-form-field {
      width: 100%;
      max-width: 400px;
    }
    .mat-mdc-dialog-content {
      max-height: 80vh;
      overflow-x: hidden;
    }
    .grid {
      row-gap: 1rem;
    }
  `]
})
export class AddOrderDialogComponent implements OnInit {
  orderForm: FormGroup;
  products: any[] = [];
  isUpdateMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) private data: Order | null
  ) {
    this.isUpdateMode = !!data;
    const today = new Date();
    
    this.orderForm = this.fb.group({
      orderNumber: [this.isUpdateMode ? data?.id : this.generateOrderNumber()],
      name: [this.isUpdateMode ? data?.name : '', Validators.required],
      productId: [this.isUpdateMode ? data?.productId : '', Validators.required],
      quantity: [this.isUpdateMode ? data?.quantity : 1, [Validators.required, Validators.min(1), Validators.max(999)]],
      salePrice: [this.isUpdateMode ? data?.salePrice : 0],
      discount: [this.isUpdateMode ? data?.discount : 0, [Validators.min(0), Validators.max(100)]],
      totalAmount: [this.isUpdateMode ? data?.totalAmount : 0],
      totalOrder: [this.isUpdateMode ? data?.totalOrder : 0],
      validityDate: [this.isUpdateMode && data?.validityDate ? new Date(data.validityDate) : today, Validators.required],
      expiryDate: [
        this.isUpdateMode && data?.expiryDate ? new Date(data.expiryDate) : this.getDefaultExpiryDate(today),
        Validators.required
      ]
    }, { validators: this.dateValidator });
  }

  generateOrderNumber(): string {
    const prefix = 'ORD';
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }

  getDefaultExpiryDate(validityDate: Date): Date {
    const expiryDate = new Date(validityDate);
    expiryDate.setDate(expiryDate.getDate() + 30);
    return expiryDate;
  }

  dateValidator(group: FormGroup) {
    const validityDate = group.get('validityDate')?.value;
    const expiryDate = group.get('expiryDate')?.value;
    
    if (validityDate && expiryDate) {
      return validityDate < expiryDate ? null : { invalidDate: true };
    }
    return null;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onProductSelect(event: any) {
    const selectedProduct = this.products.find(p => p.id === event.value);
    if (selectedProduct) {
      this.orderForm.patchValue({
        salePrice: selectedProduct.salePrice
      });
      this.calculateTotals();
    }
  }

  incrementQuantity() {
    const currentValue = this.orderForm.get('quantity')?.value || 0;
    if (currentValue < 999) {
      this.orderForm.patchValue({ quantity: currentValue + 1 });
      this.calculateTotals();
    }
  }

  decrementQuantity() {
    const currentValue = this.orderForm.get('quantity')?.value || 0;
    if (currentValue > 1) {
      this.orderForm.patchValue({ quantity: currentValue - 1 });
      this.calculateTotals();
    }
  }

  calculateTotals() {
    const quantity = this.orderForm.get('quantity')?.value || 0;
    const salePrice = this.orderForm.get('salePrice')?.value || 0;
    const discount = this.orderForm.get('discount')?.value || 0;

    const totalAmount = quantity * salePrice;
    const discountAmount = totalAmount * (discount / 100);
    const totalOrder = totalAmount - discountAmount;

    this.orderForm.patchValue({
      totalAmount: totalAmount,
      totalOrder: totalOrder
    }, { emitEvent: false });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order: Order = {
        ...this.orderForm.value,
        id: this.orderForm.get('orderNumber')?.value
      };
      this.dialogRef.close(order);
    }
  }
}
