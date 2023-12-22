import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheatherApiService } from './shared/data/wheatherApiService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  wheatherApi = inject(WheatherApiService);

  constructor() {}
}
