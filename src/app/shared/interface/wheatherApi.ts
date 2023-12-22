export interface wheatherApi {
  data: wheatherApiData;
}

export interface wheatherApiData {
  location: Location;
  condition: Condition;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
export interface Condition {
  text: string;
  icon: string;
  code: number;
}
export interface Current {
  temp_c: number;
}
