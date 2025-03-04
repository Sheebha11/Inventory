import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machine-maintenance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="machine-maintenance">
      <h2>Machine Maintenance</h2>
    </div>
  `,
  styles: [`
    .machine-maintenance {
      padding: 20px;
    }
  `]
})
export class MachineMaintenanceComponent {}
