import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar class="toolbar">
      <div class="left-section">
        <button mat-icon-button (click)="toggleSidebar()" class="menu-button">
          <mat-icon>menu</mat-icon>
        </button>
        <img src="assets/trunova-logo.png" alt="Trunova Logo" class="toolbar-logo">
      </div>

      <div class="right-section">
        <button mat-icon-button class="screen-button">
          <mat-icon>fullscreen</mat-icon>
        </button>
        
        <button mat-icon-button [matBadge]="notificationCount" matBadgeColor="warn" class="notification-button">
          <mat-icon>notifications</mat-icon>
        </button>

        <button mat-icon-button [matMenuTriggerFor]="profileMenu" class="profile-button">
          <img src="assets/profile-avatar.png" alt="Profile" class="profile-avatar">
        </button>
        
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-content">
          <!-- Logo -->
          <div class="logo-container">
            <img src="assets/logo.png" alt="Logo" class="logo">
          </div>

          <!-- Navigation Icons with Labels -->
          <div class="nav-icons">
            <a routerLink="/dashboard" routerLinkActive="active-link" class="nav-item">
              <mat-icon>grid_view</mat-icon>
              <span class="nav-label">Dashboard</span>
            </a>
            
            <a routerLink="/products" routerLinkActive="active-link" class="nav-item">
              <mat-icon>inventory_2</mat-icon>
              <span class="nav-label">Products</span>
            </a>

            <a routerLink="/maintenance" routerLinkActive="active-link" class="nav-item">
              <mat-icon>settings_suggest</mat-icon>
              <span class="nav-label">Machine Maintenance</span>
            </a>
            
            <a routerLink="/settings" routerLinkActive="active-link" class="nav-item">
              <mat-icon>settings</mat-icon>
              <span class="nav-label">Settings</span>
            </a>
            
            <a routerLink="/support" routerLinkActive="active-link" class="nav-item">
              <mat-icon>support_agent</mat-icon>
              <span class="nav-label">Support</span>
            </a>
          </div>

          <!-- Logout at bottom -->
          <div class="nav-item logout-item" (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span class="nav-label">Logout</span>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: 64px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .menu-button,
    .screen-button,
    .notification-button {
      color: #666;
    }

    .toolbar-logo {
      height: 35px;
    }

    .profile-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-button {
      padding: 0;
      min-width: 32px;
      margin-left: 8px;
    }

    mat-sidenav-container {
      height: calc(100vh - 64px);
      margin-top: 64px;
    }

    .sidenav-container {
      height: 100vh;
      position: relative;
    }

    .sidenav {
      width: 64px;
      background-color: white;
      border-right: 1px solid #e0e0e0;
      overflow: hidden;
      transition: width 0.3s ease;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
    }

    .sidenav:hover {
      width: 200px;
    }

    .main-content {
      margin-left: 64px;
      transition: margin-left 0.3s ease;
      position: relative;
      overflow-x: hidden;
    }

    .content-wrapper {
      padding: 20px;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .sidenav-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 16px;
      width: 200px;
    }

    .logo-container {
      padding: 8px 20px;
      margin-bottom: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .nav-icons {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #666;
      text-decoration: none;
      transition: all 0.3s ease;
      white-space: nowrap;
      border-radius: 0 24px 24px 0;
      margin: 4px 0;
    }

    .nav-item:hover {
      background-color: rgba(66, 103, 178, 0.04);
      color: #4267B2;
    }

    .nav-item mat-icon {
      width: 24px;
      height: 24px;
      font-size: 24px;
      margin-right: 32px;
      flex-shrink: 0;
    }

    .nav-label {
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sidenav:hover .nav-label {
      opacity: 1;
    }

    .active-link {
      color: #4267B2;
      background-color: rgba(66, 103, 178, 0.04);
      font-weight: 500;
    }

    .logout-item {
      margin-top: auto;
      margin-bottom: 16px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 64px;
      }

      .nav-label {
        display: none;
      }

      .nav-item {
        justify-content: center;
        padding: 12px 0;
      }

      .nav-item mat-icon {
        margin-right: 0;
      }
    }
  `]
})
export class AppComponent {
  isOpen = false;
  notificationCount = 3; // Example notification count

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  logout() {
    console.log('Logout clicked');
    this.closeSidebar();
  }
}
