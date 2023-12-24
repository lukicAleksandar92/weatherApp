import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  wind: number = 0;
  summary: string = '';
  // iconURL: string = '';
  imagePath: string = '';
  cityName: string = 'Beograd';
  city: string = '';
  units: string = 'metric';
  timezone!: number;
  country!: string;
  currentDate: string = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  


  constructor(private weatherService: WeatherService) {

   }

  ngOnInit(): void {
    
    this.getWeather();
    
  }

  getWeather() {
    
    this.weatherService.getweather(this.cityName,this.units).subscribe({
      
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        this.temperature = Math.round(this.myWeather.main.temp);
        this.feelsLikeTemp = Math.round(this.myWeather.main.feels_like);
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.wind = Math.round(this.myWeather.wind.speed);

        this.timezone = this.myWeather.timezone;
        this.country = this.myWeather.sys.country;
        this.summary = this.myWeather.weather[0].main;
        console.log(this.myWeather.weather[0].main);

        const localDateTime = this.convertUTCtoLocal(this.myWeather.dt, this.timezone);
        const isDST = localDateTime.getTimezoneOffset() < this.timezone / 60;
        if (isDST) {
        localDateTime.setHours(localDateTime.getHours() - 1);
        }
        this.currentDate = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
        this.currentTime = localDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';

        this.imagePath = `./../assets/${this.myWeather.weather[0].main}.jpg`;

      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed')
    })
  }

  onSubmit() {
    
    this.weatherService.getweather(this.city,this.units).subscribe({
      
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        this.temperature = Math.round(this.myWeather.main.temp);
        this.feelsLikeTemp = Math.round(this.myWeather.main.feels_like);
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.wind = Math.round(this.myWeather.wind.speed);
        this.timezone = this.myWeather.timezone;
        this.country = this.myWeather.sys.country;
        this.summary = this.myWeather.weather[0].main;

        console.log(this.myWeather.weather[0].main);

        const localDateTime = this.convertUTCtoLocal(this.myWeather.dt, this.timezone);
        const isDST = localDateTime.getTimezoneOffset() < this.timezone / 60;
        if (isDST) {
        localDateTime.setHours(localDateTime.getHours() - 1);
        }
        this.currentDate = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
        this.currentTime = localDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


        this.imagePath = `./../assets/${this.myWeather.weather[0].main}.jpg`;
        this.cityName = this.city
        this.city = '';
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed')
    })
  }

  
  convertUTCtoLocal(utcTime: number, timezoneOffset: number): Date {
    const localUnixTimestamp = utcTime + timezoneOffset;
    return new Date(localUnixTimestamp * 1000);
  }
  
  





}
