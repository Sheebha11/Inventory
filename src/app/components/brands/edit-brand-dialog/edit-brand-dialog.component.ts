import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Brand from '../../../../types/brand';

@Component({
  selector: 'app-edit-brand-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="text-xl font-semibold mb-4">Edit Brand</h2>
      <form [formGroup]="brandForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <mat-form-field class="w-full">
            <mat-label>Brand Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter brand name">
            <mat-error *ngIf="brandForm.get('name')?.hasError('required')">
              Brand name is required
            </mat-error>
          </mat-form-field>
        </mat-dialog-content>
        
        <mat-dialog-actions align="end" class="mt-4">
          <button mat-button type="button" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!brandForm.valid">
            Update
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
      min-width: 300px;
    }
  `]
})
export class EditBrandDialogComponent {
  brandForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,
    private fb: FormBuilder
  ) {
    this.brandForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.minLength(2)]],
      id: [data.id]
    });
  }

  onSubmit() {
    if (this.brandForm.valid) {
      this.dialogRef.close(this.brandForm.value);
    }
  }
}
