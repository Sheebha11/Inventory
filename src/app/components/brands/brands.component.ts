import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrandService } from '../../services/brand.service';
import Brand from '../../../types/brand';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBrandDialogComponent } from './add-brand-dialog/add-brand-dialog.component';
import { EditBrandDialogComponent } from './edit-brand-dialog/edit-brand-dialog.component';

@Component({
  selector: 'app-brands',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatDialogModule,
    AddBrandDialogComponent,
    EditBrandDialogComponent
  ],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  standalone: true
})
export class BrandsComponent {
  dataSource = new MatTableDataSource<Brand>();
  displayedColumns: string[] = ['name', 'action'];
  brandService = inject(BrandService);
  private dialog = inject(MatDialog);


  @ViewChild(MatPaginator) pagination!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.brandService.getBrands().subscribe((result) => {
      this.initTable(result);
    });
  }

  initTable(data: Brand[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddBrandDialog(): void {
    const dialogRef = this.dialog.open(AddBrandDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the new brand data here
        // You can call your service to save the brand
        this.saveBrand(result);
      }
    });
  }

  saveBrand(brand: Brand): void {
    // Implement the logic to save the brand using the brandService
    this.brandService.addBrand(brand).subscribe(() => {
      // Handle the success of adding the brand
      this.brandService.getBrands().subscribe((result) => {
        this.initTable(result);
      });
    });
  }

  openEditBrandDialog(brand: Brand): void {
    const dialogRef = this.dialog.open(EditBrandDialogComponent, {
      width: '400px',
      data: brand
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBrand(result);
      }
    });
  }

  updateBrand(brand: Brand): void {
    this.brandService.updateBrand(brand).subscribe(() => {
      // Refresh the table data
      this.brandService.getBrands().subscribe((result) => {
        this.initTable(result);
      });
    });
  }
}
