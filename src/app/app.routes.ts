import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MachineMaintenanceComponent } from './components/machine-maintenance/machine-maintenance.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SupportComponent } from './components/support/support.component';
import { AddMaterialDialogComponent } from './components/add-material-dialog/add-material-dialog.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
export const routes: Routes = [
  {
    path: 'dashboard',

    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'machine-maintenance',
    component: MachineMaintenanceComponent,
    title: 'Machine Maintenance'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings'
  },
  {
    path: 'support',
    component: SupportComponent,
    title: 'Support'
  },
  {
    path: 'add-material',
    component: AddMaterialDialogComponent,
    title: 'Add Material'
  },
  {
    path:'',
    redirectTo:'products',
    pathMatch:'full'
  },
  {
    path:'products',
    component:ProductsComponent
  
  },
  {
    path:'add-product',
    component:AddProductComponent
  },
  {
    path: '**',
    redirectTo:'products'
  }
];
    