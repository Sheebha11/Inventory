import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="support">
      <h2>Support</h2>
    </div>
  `,
  styles: [`
    .support {
      padding: 20px;
    }
  `]
})
export class SupportComponent {} 