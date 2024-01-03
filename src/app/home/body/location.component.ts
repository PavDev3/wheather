import { Component, Input } from '@angular/core';
import { Current, Location } from '../../shared/interface/wheatherApi';

@Component({
  standalone: true,
  selector: 'app-location',
  imports: [],
  styleUrls: ['./location.component.scss'],
  template: `
    <div class="location">
      <h1>Tiempo</h1>
      <p>
        Localización: <strong>{{ location.name }} </strong>
      </p>
      <p>Region: {{ location.region }}</p>
      <p>País: {{ location.country }}</p>
      <p>Hora: {{ location.localtime }}</p>
      <p>Temp: {{ current.temp_c }}</p>
      <p class="conditions">
        Condiciones: <img [src]="current.condition.icon" />
      </p>
    </div>
  `,
})
export class LocationComponent {
  @Input() location!: Location;
  @Input() current!: Current;

  constructor() {}
}
