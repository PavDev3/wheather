import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheatherApiService } from '../shared/data/wheatherApiService';
import { LocationComponent } from './location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <app-location
        [location]="wheatherService.location()"
        [current]="wheatherService.current()"
      ></app-location>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
  imports: [CommonModule, RouterOutlet, LocationComponent],
})
export class HomeComponent {
  wheatherService = inject(WheatherApiService);

  constructor() {}
}
