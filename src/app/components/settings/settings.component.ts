import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings">
      <h2>Settings</h2>
    </div>
  `,
  styles: [`
    .settings {
      padding: 20px;
    }
  `]
})
export class SettingsComponent {}
