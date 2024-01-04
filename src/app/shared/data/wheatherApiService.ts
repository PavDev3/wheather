import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import {
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import {
  _ApiKey,
  _remoteServiceCurrent,
} from '../../../../environments/environment';
import { Current, Location, wheatherApiData } from '../interface/wheatherApi';

export interface WheatherState {
  current: Current;
  location: Location;
  loading: boolean;
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
      condition: {
        text: '',
        icon: '',
        code: 0,
      },
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
    loading: true,
  });

  //selectors
  current = computed(() => this.state().current);
  location = computed(() => this.state().location);
  condition = computed(() => this.state().current.condition);
  loading = computed(() => this.state().loading);

  //Sources
  private locationChanged$ = this.locationFormControl.valueChanges.pipe(
    startWith('Madrid'),
    debounceTime(500),
    distinctUntilChanged(),
    map((city) => (city.length ? city : 'Madrid'))
  );
  currentLoaded$ = this.locationChanged$.pipe(
    switchMap((city) => this.fetchWeatherApiCurrent(city))
  );

  constructor() {
    // reducers

    this.locationChanged$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.state.update((state) => ({
        ...state,
        current: {
          temp_c: 0,
          condition: {
            text: '',
            icon: '',
            code: 0,
          },
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
        loading: true,
      }));
    });

    this.currentLoaded$.pipe(takeUntilDestroyed()).subscribe((response) => {
      console.log(response);
      this.state.update((state) => ({
        ...state,
        location: response.location,
        current: response.current,
        loading: false,
      }));
    });
  }

  private fetchWeatherApiCurrent(city: string) {
    return this.http
      .get<wheatherApiData>(`${_remoteServiceCurrent}?key=${_ApiKey}&q=${city}`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching Wheather Condition', err);
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
