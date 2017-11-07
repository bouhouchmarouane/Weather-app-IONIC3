import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  private weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?appid=d22e2e5f43c604c87109040fe37b9c8c";

  constructor(public http: Http) {}

  getWeatherByCoords(lat: number, lng: number){
    return this.http.get(this.weatherApiUrl + '&lat=' + lat + '&lon=' + lng)
      .map(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in Weather provider');
    return Promise.reject(error.message || error);
  }
}
