import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";


/**
 * Generated class for the LocalizeMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-localize-me',
  templateUrl: 'localize-me.html',
})
export class LocalizeMePage {

  private apiResponse;
  private currentLng: number;
  private currentLat: number;
  private today: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public weatherProvider: WeatherProvider) {
    this.getInfos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizeMePage');
  }

  getInfos(){
    navigator.geolocation.getCurrentPosition(function(position){
        let currentLng = position.coords.longitude;
        let currentLat = position.coords.latitude;
        let timestamp = position.timestamp;
        this.weatherProvider.getWeatherByCoords(currentLat, currentLng)
          .subscribe(response => this.apiResponse = response);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.today = new Date(timestamp).toLocaleString('en-US', options);
      }.bind(this),
      function (err) {
        console.log(err);
      });
  }

  convert_temp(temp_source: number, to: string): number{
    let temp_result: number;
    if(to == 'c') temp_result =  temp_source - 273.15;
    else temp_result = temp_source * 9/5 - 459.67;
    return temp_result;
  }
}
