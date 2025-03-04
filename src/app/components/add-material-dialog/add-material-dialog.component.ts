import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-material-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Add Material</h2>
        <button mat-icon-button (click)="onClose()" class="close-button">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="dialog-content">
        <h3>Material 1</h3>
        
        <div class="form-group">
          <div class="form-row">
            <div class="form-field">
              <label>HSN Code</label>
              <div class="select-wrapper">
                <input type="text" placeholder="Search/Select HSN Code">
                <mat-icon>expand_more</mat-icon>
              </div>
            </div>

            <div class="form-field">
              <label>Material Name <span class="required">*</span></label>
              <input type="text" placeholder="Material Name">
            </div>
          </div>

          <div class="form-row three-fields">
            <div class="form-field">
              <label>Material Category <span class="required">*</span></label>
              <div class="select-wrapper">
                <input type="text" placeholder="Select Category">
                <mat-icon>expand_more</mat-icon>
              </div>
            </div>

            <div class="form-field">
              <label>Quantity <span class="required">*</span></label>
              <div class="select-wrapper">
                <input type="text" placeholder="Select QTY">
                <mat-icon>expand_more</mat-icon>
              </div>
            </div>

            <div class="form-field">
              <label>Measurement Unit <span class="required">*</span></label>
              <div class="select-wrapper">
                <input type="text" placeholder="Select Unit">
                <mat-icon>expand_more</mat-icon>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Location ID <span class="required">*</span></label>
              <div class="location-input-wrapper">
                <input type="text" placeholder="Select Location ID">
                <button class="fetch-button">Fetch Location</button>
              </div>
            </div>

            <div class="form-field">
              <label>Added Date <span class="required">*</span></label>
              <div class="date-input">
                <input type="text" value="10/09/2025" readonly>
                <button class="calendar-button">
                  <mat-icon>calendar_today</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Material Image <span class="required">*</span></label>
              <div class="upload-box">
                <p>Browse and chose the Image you want</p>
                <p>to upload from your computer</p>
                <button class="upload-button">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
            </div>

            <div class="form-field">
              <label>Material Description <span class="required">*</span></label>
              <textarea placeholder="Enter Description" rows="6"></textarea>
            </div>
          </div>
        </div>

        <div class="button-container">
          <button class="add-new-material">Add New Material</button>
        </div>
      </div>

      <div class="footer-buttons">
        <button class="back-btn">Back</button>
        <button class="create-list-btn">Create List</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
    }

    .dialog-header {
      background: #4267B2;
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }

    .close-button {
      color: white;
      width: 32px;
      height: 32px;
      line-height: 32px;
    }

    .close-button mat-icon {
      font-size: 18px;
    }

    .dialog-content {
      padding: 16px 20px;
      overflow-y: auto;
      flex: 1;
    }

    h3 {
      margin: 0 0 16px;
      font-size: 14px;
      color: #333;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .three-fields {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }

    .form-field {
      flex: 1;
      min-width: 0;
    }

    label {
      display: block;
      margin-bottom: 4px;
      color: #333;
      font-size: 13px;
    }

    .required {
      color: red;
    }

    input, textarea {
      width: 100%;
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 13px;
      height: 32px;
    }

    textarea {
      height: auto;
      min-height: 80px;
    }

    .select-wrapper {
      position: relative;
    }

    .select-wrapper mat-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 18px;
    }

    .location-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .location-input-wrapper input {
      width: 100%;
      padding-right: 110px; /* Space for the button */
    }

    .fetch-button {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      background: #4267B2;
      color: white;
      border: none;
      padding: 4px 12px;
      border-radius: 3px;
      font-size: 12px;
      cursor: pointer;
      height: 28px;
      line-height: 20px;
      white-space: nowrap;
    }

    .date-input {
      position: relative;
      height: 32px;
    }

    .calendar-button {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
    }

    .calendar-button mat-icon {
      font-size: 18px;
    }

    .upload-box {
      border: 2px dashed #ccc;
      padding: 16px;
      text-align: center;
      border-radius: 4px;
      min-height: 80px;
    }

    .upload-box p {
      margin: 2px 0;
      color: #666;
      font-size: 12px;
    }

    .upload-button {
      background: #4267B2;
      color: white;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-top: 8px;
      cursor: pointer;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0 0 0;
    }

    .add-new-material {
      background-color: #4267B2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }

    .footer-buttons {
      display: flex;
      gap: 16px;
      padding: 16px 20px;
      background: #f8f9fa;
      border-top: 1px solid #dee2e6;
      margin-top: auto;
    }

    .back-btn {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      max-width: 200px;
    }

    .create-list-btn {
      flex: 1;
      padding: 10px;
      background: #4267B2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      max-width: 200px;
    }

    /* Hover states */
    .add-new-material:hover,
    .create-list-btn:hover {
      background-color: #365899;
    }

    .back-btn:hover {
      background-color: #f5f5f5;
    }

    /* Active states */
    .add-new-material:active,
    .create-list-btn:active {
      transform: translateY(1px);
    }

    .back-btn:active {
      background-color: #e5e5e5;
    }

    /* Adjust hover and focus states */
    .fetch-button:hover {
      background: #365899;
    }

    input:focus {
      outline: none;
      border-color: #4267B2;
    }
  `]
})
export class AddMaterialDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddMaterialDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onBack(): void {
    // Handle back logic
  }

  onCreate(): void {
    // Handle create logic
    this.dialogRef.close(true);
  }
}
