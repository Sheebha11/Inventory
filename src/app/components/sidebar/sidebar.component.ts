import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/orders" routerLinkActive="active">
        <mat-icon matListItemIcon>shopping_cart</mat-icon>
        <span matListItemTitle>Orders</span>
      </a>

      <a mat-list-item routerLink="/products" routerLinkActive="active">
        <mat-icon matListItemIcon>inventory_2</mat-icon>
        <span matListItemTitle>Products</span>
      </a>

      <a mat-list-item routerLink="/brands" routerLinkActive="active">
        <mat-icon matListItemIcon>business</mat-icon>
        <span matListItemTitle>Brands</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active {
      background-color: rgba(0, 0, 0, 0.04);
      color: #3f51b5;
    }
    .active mat-icon {
      color: #3f51b5;
    }
  `]
})
export class SidebarComponent {}
