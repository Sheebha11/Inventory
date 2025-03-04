import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OrderService, Order } from '../../services/order.service';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule
  ],
  template: `
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Orders Management</h1>
        <button mat-raised-button color="primary" (click)="openAddOrderDialog()">
          <mat-icon>add</mat-icon>
          New Order
        </button>
      </div>

      <mat-form-field class="w-full">
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search orders" #input>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- Order Number Column -->
          <ng-container matColumnDef="orderNumber">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Order #</th>
            <td mat-cell *matCellDef="let row">{{row.orderNumber}}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Customer</th>
            <td mat-cell *matCellDef="let row">{{row.name}}</td>
          </ng-container>

          <!-- Product Column -->
          <ng-container matColumnDef="productId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Product</th>
            <td mat-cell *matCellDef="let row">{{getProductName(row.productId)}}</td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Quantity</th>
            <td mat-cell *matCellDef="let row">{{row.quantity}}</td>
          </ng-container>

          <!-- Sale Price Column -->
          <ng-container matColumnDef="salePrice">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
            <td mat-cell *matCellDef="let row">{{row.salePrice | currency}}</td>
          </ng-container>

          <!-- Validity Date Column -->
          <ng-container matColumnDef="validityDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Valid From</th>
            <td mat-cell *matCellDef="let row">
              {{row.validityDate | date:'MM/dd/yyyy'}}
            </td>
          </ng-container>

          <!-- Expiry Date Column -->
          <ng-container matColumnDef="expiryDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Valid Until</th>
            <td mat-cell *matCellDef="let row">
              {{row.expiryDate | date:'MM/dd/yyyy'}}
            </td>
          </ng-container>

          <!-- Discount Column -->
          <ng-container matColumnDef="discount">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Discount</th>
            <td mat-cell *matCellDef="let row">{{row.discount}}%</td>
          </ng-container>

          <!-- Total Amount Column -->
          <ng-container matColumnDef="totalAmount">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Total</th>
            <td mat-cell *matCellDef="let row">{{row.totalAmount | currency}}</td>
          </ng-container>

          <!-- Total Order Column -->
          <ng-container matColumnDef="totalOrder">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Final Total</th>
            <td mat-cell *matCellDef="let row">{{row.totalOrder | currency}}</td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let row">
              <button mat-raised-button color="primary" (click)="updateOrder(row)" class="mr-2">
                <mat-icon>update</mat-icon>
                Update
              </button>
              <button mat-button color="warn" (click)="deleteOrder(row.id)">
                <mat-icon>delete</mat-icon>
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }

    table {
      width: 100%;
    }

    .mat-mdc-form-field {
      font-size: 14px;
      width: 100%;
    }

    td, th {
      white-space: nowrap;
      padding: 0 16px;
    }

    .mat-column-actions {
      width: 200px;
      text-align: center;
      white-space: nowrap;
    }

    .mat-column-validityDate,
    .mat-column-expiryDate {
      min-width: 120px;
    }

    .text-warn {
      color: #f44336;
    }

    .mat-icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
      vertical-align: middle;
      margin-left: 4px;
    }

    .mr-2 {
      margin-right: 8px;
    }
  `]
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'name',
    'productId',
    'quantity',
    'salePrice',
    'validityDate',
    'expiryDate',
    'discount',
    'totalAmount',
    'totalOrder',
    'actions'
  ];
  dataSource: MatTableDataSource<Order>;
  products: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(orders => {
      // Convert string dates to Date objects
      const processedOrders = orders.map(order => ({
        ...order,
        validityDate: new Date(order.validityDate),
        expiryDate: new Date(order.expiryDate)
      }));
      this.dataSource.data = processedOrders;
    });
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddOrderDialog() {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.addOrder(result).subscribe(() => {
          this.loadOrders();
        });
      }
    });
  }

  updateOrder(order: Order) {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '800px',
      data: order,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateOrder(order.id, result).subscribe({
          next: () => {
            this.loadOrders();
            // You might want to add a success message here
          },
          error: (error) => {
            console.error('Error updating order:', error);
            // You might want to add an error message here
          }
        });
      }
    });
  }

  deleteOrder(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  isValidityExpired(date: string | Date): boolean {
    const validityDate = new Date(date);
    const today = new Date();
    return validityDate > today;
  }

  isExpired(date: string | Date): boolean {
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate < today;
  }
}
