import { Component, Input, inject } from '@angular/core';
import { WheatherApiService } from '../shared/data/wheatherApiService';
import { Condition, Current } from '../shared/interface/wheatherApi';

@Component({
  standalone: true,
  selector: 'app-temp',
  template: `
    <div class="temp">
      <h1>Temperatura</h1>
      <p>Temp: {{ current?.temp_c }}</p>
      <p>Condition : {{ condition?.text }}</p>
    </div>
  `,
  styles: [
    `
      .temp {
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
export class TempComponent {
  wheatherApiService = inject(WheatherApiService);
  @Input() current?: Current;
  @Input() condition?: Condition;

  constructor() {}
}
