import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { Current, Location, wheatherApiData } from '../interface/wheatherApi';
import { _ApiKey, _remoteService } from './../../../environments/environment';

export interface WheatherState {
  current: Current;
  location: Location;
}

@Injectable({
  providedIn: 'root',
})
export class WheatherApiService {
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
  });

  //selectors
  current = computed(() => this.state().current);
  location = computed(() => this.state().location);

  //Sources
  locationLoaded$ = this.fetchWeatherApiLocation();
  currentLoaded$ = this.fetchWeatherApiCurrent();

  constructor() {
    // reducers

    this.currentLoaded$.pipe(takeUntilDestroyed()).subscribe((current) => {
      console.log(current.temp_c);
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

  private fetchWeatherApiLocation() {
    return this.http
      .get<wheatherApiData>(`${_remoteService}?key=${_ApiKey}&q=Ronda`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching Wheather Condition', err);
          return EMPTY;
        }),
        map((response) => response.location)
      );
  }

  private fetchWeatherApiCurrent() {
    return this.http
      .get<wheatherApiData>(`${_remoteService}?key=${_ApiKey}&q=Ronda`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching Wheather Condition', err);
          return EMPTY;
        }),
        map((response) => response.current)
      );
  }
}
