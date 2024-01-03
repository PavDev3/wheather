import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheatherApiService } from '../shared/data/wheatherApiService';
import { LocationComponent } from './body/location.component';
import { SearchBarComponent } from './body/searchBar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <app-location
        [location]="wheatherService.location()"
        [current]="wheatherService.current()"
      ></app-location>
      <app-search-bar
        [locationFormControl]="wheatherService.locationFormControl"
      ></app-search-bar>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
  imports: [CommonModule, RouterOutlet, LocationComponent, SearchBarComponent],
})
export class HomeComponent {
  wheatherService = inject(WheatherApiService);

  constructor() {}
}
