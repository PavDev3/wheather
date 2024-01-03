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
    <input
      matInput
      placeholder=""
      type="text"
      [formControl]="locationFormControl"
    />
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
