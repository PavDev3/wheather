import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, map } from 'rxjs';
import { _ApiKey, _remoteService } from '../../../../environments/environment';
import {
  Condition,
  Current,
  Location,
  wheatherApiData,
} from '../interface/wheatherApi';

export interface WheatherState {
  current: Current;
  location: Location;
  condition: Condition;
}

@Injectable({
  providedIn: 'root',
})
export class WheatherApiService {
  locationFormControl = new FormControl();
  private http = inject(HttpClient);

  //state
  private state = signal<WheatherState>({
    current: {
      temp_c: 0,
    },
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: '',
    },
    condition: {
      text: '',
      icon: '',
      code: 0,
    },
  });

  //selectors
  current = computed(() => this.state().current);
  location = computed(() => this.state().location);
  condition = computed(() => this.state().condition);

  //Sources
  locationLoaded$ = this.fetchWeatherApiLocation('Algeciras');
  currentLoaded$ = this.fetchWeatherApiCurrent('Algeciras');
  conditionLoaded$ = this.fetchWeatherApiCurrent('Algeciras');

  constructor() {
    // reducers

    // this.conditionLoaded$.pipe(takeUntilDestroyed()).subscribe((condition) => {
    //   console.log(condition);
    //   this.state.update((state) => ({
    //     ...state,
    //     condition: condition
    //   }));
    // });

    this.currentLoaded$.pipe(takeUntilDestroyed()).subscribe((current) => {
      console.log(current);
      this.state.update((state) => ({
        ...state,
        current: current,
      }));
    });

    this.locationLoaded$.pipe(takeUntilDestroyed()).subscribe((location) => {
      console.log(location);
      this.state.update((state) => ({
        ...state,
        location: location,
      }));
    });
  }

  private fetchWeatherApiLocation(city: string) {
    return this.http
      .get<wheatherApiData>(`${_remoteService}?key=${_ApiKey}&q=${city}`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching Wheather Condition', err);
          return EMPTY;
        }),
        map((response) => response.location)
      );
  }

  private fetchWeatherApiCurrent(city: string) {
    return this.http
      .get<wheatherApiData>(`${_remoteService}?key=${_ApiKey}&q=${city}`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching Wheather Condition', err);
          return EMPTY;
        }),
        map((response) => response.current)
      );
  }
}
