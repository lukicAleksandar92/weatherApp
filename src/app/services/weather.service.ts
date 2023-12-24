import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { 

  }

  apiKey: string = process.env['OPENWEATHER_API_KEY'] || '';

  

  getweather(city: string, units: string) {

    const params = new HttpParams()
      .set('q', city)
      .set('units', units)
      .set('appid', this.apiKey);

    return this.http.get('https://api.openweathermap.org/data/2.5/weather', { params });
  }
}



