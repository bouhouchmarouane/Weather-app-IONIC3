import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";
import {CitiesImagesProvider} from "../../providers/cities-images/cities-images";
import {Storage} from "@ionic/storage";


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

  private WeatherApiResponse;
  private imagesApiResponse;
  private today: string;
  private bgImageIndex: number = 0;
  private nb_images: number = 0;
  private bgImage:string;
  private city;
  private favorite: boolean;
  private favCities = [];
  private test ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public weatherProvider: WeatherProvider,
              public citiesImagesProvider: CitiesImagesProvider,
              private storage: Storage) {
    this.getInfos();
    //this.favCities = this.storage.get('favCities');
  }

  getInfos(){
    navigator.geolocation.getCurrentPosition(function(position){
        let currentLng = position.coords.longitude;
        let currentLat = position.coords.latitude;
        let timestamp = position.timestamp;
        this.weatherProvider.getWeatherByCoords(currentLat, currentLng)
          .subscribe(response => {
            this.bgImageIndex = 0;
            this.WeatherApiResponse = response;
            if(response.name != this.city){
              this.city = response.name;
              this.setBgImage(this.city);
            }
          });
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.today = new Date(timestamp).toLocaleString('en-US', options);
      }.bind(this),
      function (err) {
        console.log(err);
      });
  }

  convert_temp(temp_source: number, to: string): number{
    let temp_result;
    if(to == 'c') temp_result =  Math.round(temp_source - 273.15).toFixed(0);

  else temp_result = Math.round(temp_source * 9/5 - 459.67).toFixed(0);
    return temp_result;
  }

  setBgImage(city: string){
    this.citiesImagesProvider.getImages(city)
      .then(response => {
        this.nb_images = response.totalHits;
        if(this.nb_images > 0){
          this.imagesApiResponse = response;
          this.bgImage = response.hits[0].webformatURL;
        }
        else{
          this.bgImage = 'none';
        }
      });
  }

  changeBgImage(){
    if(this.nb_images){
      if(this.bgImageIndex == this.nb_images - 1)this.bgImageIndex = 0;
      else this.bgImageIndex++;
      this.bgImage = this.imagesApiResponse.hits[this.bgImageIndex].webformatURL;
    }
  }

  toggleFavorite(){
    this.favCities.push(this.city);
    this.storage.set('favCities', JSON.stringify(this.favCities))
    console.log(this.storage.get('favCities'));
    this.test = JSON.stringify(this.storage.get('favCities'));
    console.log('test');
    console.log(this.test);
  }
}
