import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  template: `
    <div class="search-bar-container">
      <input
        matInput
        placeholder=""
        type="text"
        [formControl]="locationFormControl"
      />
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styles: [
    `
      .search-bar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      input {
        width: 400px;
        height: 50px;
        background: #fff;
        color: #000;
      }
    `,
  ],
})
export class SearchBarComponent {
  @Input({ required: true }) locationFormControl!: FormControl;
}
