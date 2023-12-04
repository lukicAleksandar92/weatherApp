import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { subscribeOn } from 'rxjs';

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
  summary: string = '';
  iconURL: string = '';
  imagePath: string = '';
  city: string = 'Yakutsk';
  units: string = 'metric'

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getweather(this.city, this.units).subscribe({

      next: (res) => {
        console.log(res);
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        console.log(this.myWeather.weather[0].main);

        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';

        this.imagePath = `./../assets/${this.myWeather.weather[0].main}.PNG`;
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed')
    })
  }

  onRadioButtonChange() {
    if (this.units == 'metric') {
      this.units = 'imperial';
    } else {
      this.units = 'metric';
    }

    this.getWeather();
  }

}
