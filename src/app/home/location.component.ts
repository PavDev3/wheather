import { Component, Input, inject } from '@angular/core';
import { WheatherApiService } from '../shared/data/wheatherApiService';
import { Location } from '../shared/interface/wheatherApi';

@Component({
  standalone: true,
  selector: 'app-location',
  imports: [],
  template: `
    <div class="location">
      <h1>Location</h1>
      <p>Location: {{ location?.name }}</p>
      <p>Region: {{ location?.region }}</p>
      <p>Country: {{ location?.country }}</p>
      <p>Hora: {{ location?.localtime }}</p>
    </div>
  `,

  styles: [
    `
      .location {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #fff;
        color: #000;
      }
    `,
  ],
})
export class LocationComponent {
  wheatherApiService = inject(WheatherApiService);
  @Input() location?: Location;

  constructor() {}
}
