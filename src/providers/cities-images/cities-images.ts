import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CitiesImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CitiesImagesProvider {

  private imagesApiUrl = 'https://pixabay.com/api/?key=6968396-8ea39fae551e68ac33d7f9c17&image_type=photo&orientation=vertical&category=nature,travel,buildings&q='

  constructor(public http: Http) {}

  getImages(city: string){
    return this.http.get(this.imagesApiUrl + city)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in images provider');
    return Promise.reject(error.message || error);
  }
}
