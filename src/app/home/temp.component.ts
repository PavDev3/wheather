import { Component, Input } from '@angular/core';
import { Current } from '../shared/interface/wheatherApi';

@Component({
  standalone: true,
  selector: 'app-temp',
  template: `
    <div class="temp">
      <h1>Temperature</h1>
      <p>Temp: {{ current?.temp_c }}</p>
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
  @Input() current?: Current;

  constructor() {}
}
