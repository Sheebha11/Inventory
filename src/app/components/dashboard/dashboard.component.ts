import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';

interface MaterialData {
  sNo: number;
  materialName: string;
  materialCode: string;
  materialCategory: string;
  description: string;
  quantity: number;
  unitOfMeasurement: string;
  locationId: string;
  dateAdded: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="content-wrapper">
        <div class="header-stats-container">
          <h2 class="dashboard-title">Material Dashboard</h2>
          <div class="stats-container">
            <mat-card class="stats-card">
              <div class="stats-content">
                <div class="stats-info">
                  <h2>350</h2>
                  <p>Total Materials</p>
                </div>
                <mat-icon class="stats-icon">inventory_2</mat-icon>
              </div>
            </mat-card>

            <mat-card class="stats-card">
              <div class="stats-content">
                <div class="stats-info">
                  <h2>350</h2>
                  <p>Total Materials</p>
                </div>
                <mat-icon class="stats-icon">inventory_2</mat-icon>
              </div>
            </mat-card>

            <mat-card class="stats-card">
              <div class="stats-content">
                <div class="stats-info">
                  <h2>350</h2>
                  <p>Total Materials</p>
                </div>
                <mat-icon class="stats-icon">inventory_2</mat-icon>
              </div>
            </mat-card>
          </div>
        </div>

        <!-- Material List Section -->
        <div class="material-list-section">
          <div class="material-list-header">
            <h2 class="section-title">Material List</h2>
            <div class="material-actions">
              <div class="search-container">
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search Customer ID, Code, Name"
                  (keyup)="onSearch($event)"
                >
                <button class="search-button">
                  <mat-icon>search</mat-icon>
                </button>
              </div>
              <button class="filter-button">
                <mat-icon>filter_list</mat-icon>
              </button>
              <button mat-button class="add-material-btn" (click)="openAddMaterialDialog()">
                <mat-icon>add</mat-icon>
                Add New Material
              </button>
            </div>
          </div>

          <table mat-table [dataSource]="materials" class="material-table">
            <ng-container matColumnDef="sNo">
              <th mat-header-cell *matHeaderCellDef> S No </th>
              <td mat-cell *matCellDef="let element"> {{element.sNo}} </td>
            </ng-container>

            <ng-container matColumnDef="materialName">
              <th mat-header-cell *matHeaderCellDef> Material Name </th>
              <td mat-cell *matCellDef="let element"> 
                <a href="#" class="material-link">{{element.materialName}}</a>
              </td>
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
              <td mat-cell *matCellDef="let element" class="action-column">
                <button mat-icon-button color="primary" class="edit-button" (click)="onEdit(element)">
                  <mat-icon class="edit-icon">edit_note</mat-icon>
                </button>
                <button mat-icon-button color="warn" class="delete-button" (click)="onDelete(element)">
                  <mat-icon class="delete-icon">delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: #f5f5f5;
      min-height: 100vh;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-stats-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .dashboard-title {
      color: #1f2937;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }

    .stats-container {
      display: flex;
      gap: 16px;
      flex-grow: 1;
      justify-content: flex-end;
      margin-left: 24px;
    }

    .stats-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      height: 100px;
      width: 240px;
    }

    .stats-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      height: 100%;
    }

    .stats-info h2 {
      font-size: 24px;
      font-weight: 500;
      margin: 0;
      color: #333;
    }

    .stats-info p {
      margin: 4px 0 0;
      color: #666;
      font-size: 13px;
    }

    .stats-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1a73e8;
    }

    /* Responsive adjustments */
    @media (max-width: 1200px) {
      .content-wrapper {
        max-width: 100%;
      }
    }

    @media (max-width: 1024px) {
      .header-stats-container {
        flex-direction: column;
        align-items: flex-start;
      }

      .stats-container {
        margin-left: 0;
        margin-top: 16px;
        width: 100%;
        justify-content: space-between;
      }

      .stats-card {
        width: calc(33.33% - 11px);
      }
    }

    @media (max-width: 768px) {
      .stats-container {
        flex-direction: column;
      }

      .stats-card {
        width: 100%;
      }
    }

    .material-list-section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-top: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .material-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 500;
      color: #1a73e8;
      margin: 0;
    }

    .material-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .search-container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .search-input {
      width: 300px;
      height: 40px;
      padding: 8px 40px 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input::placeholder {
      color: #9ca3af;
    }

    .search-input:focus {
      border-color: #1a73e8;
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: #1a73e8;
      border: none;
      border-radius: 0 4px 4px 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .search-button mat-icon {
      color: white;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .filter-button {
      background: #1a73e8;
      border: none;
      border-radius: 4px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 8px;
    }

    .filter-button mat-icon {
      color: white;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .add-material-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: white;
      border: 1px solid #1a73e8;
      color: #1a73e8;
      padding: 0 16px;
      height: 36px;
      border-radius: 4px;
    }

    .add-material-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .material-list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .material-actions {
        flex-direction: column;
        width: 100%;
      }

      .search-container {
        width: 100%;
      }

      .search-input {
        width: 100%;
      }

      .add-material-btn {
        width: 100%;
        justify-content: center;
      }
    }

    .material-table {
      width: 100%;
    }

    .material-link {
      color: #3f51b5;
      text-decoration: none;
    }

    .material-link:hover {
      text-decoration: underline;
    }

    tr.mat-mdc-row {
      height: 48px;
    }

    .mat-mdc-row:nth-child(even) {
      background-color: #f8f9fa;
    }

    .mat-mdc-header-cell {
      color: #333;
      font-weight: 500;
    }

    .mat-mdc-cell {
      color: #666;
    }

    .action-column {
      width: 120px;
      text-align: center;
    }

    .edit-button {
      color: #3f51b5;
      margin-right: 8px;
    }

    .delete-button {
      color: #dc3545;
    }

    .edit-icon, .delete-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .mat-mdc-icon-button {
      width: 36px;
      height: 36px;
      padding: 6px;
    }

    .mat-mdc-icon-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .edit-button:hover {
      color: #2c387e;
    }

    .delete-button:hover {
      color: #b02a37;
    }
  `]
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'sNo', 'materialName', 'materialCode', 'materialCategory',
    'description', 'quantity', 'unitOfMeasurement', 'locationId',
    'dateAdded', 'action'
  ];

  materials: MaterialData[] = [
    {
      sNo: 1,
      materialName: '6 Inch Screw',
      materialCode: 'A1122',
      materialCategory: 'Screw',
      description: 'Its a 6 Inch screw used in construction',
      quantity: 100,
      unitOfMeasurement: 'Kg',
      locationId: 'A1.1.1.18',
      dateAdded: '01/02/2025'
    },
    
  ];

  constructor(private dialog: MatDialog) {
    this.totalMaterials = this.materials.length;
  }

  totalMaterials: number = 0;

  onEdit(material: MaterialData) {
    console.log('Edit material:', material);
    // Implement edit logic
  }

  onDelete(material: MaterialData) {
    console.log('Delete material:', material);
    // Implement delete logic
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log('Searching:', searchValue);
  }

  openAddMaterialDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '800px',
      disableClose: true,
      panelClass: 'add-material-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Material added');
        // Handle the result after dialog is closed
      }
    });
  }
}
