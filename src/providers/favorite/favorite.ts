import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const STORAGE_KEY = 'favoriteCities';

@Injectable()
export class FavoriteProvider {

  constructor(public storage: Storage) { }

  isFavorite(cityId) {
    return this.getAllFavoriteCities().then(result => {
      return result && result.indexOf(cityId) !== -1;
    });
  }

  favoriteCity(cityId) {
    return this.getAllFavoriteCities().then(result => {
      if (result) {
        result.push(cityId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [cityId]);
      }
    });
  }

  unfavoriteCity(cityId) {
    return this.getAllFavoriteCities().then(result => {
      if (result) {
        var index = result.indexOf(cityId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllFavoriteCities() {
    return this.storage.get(STORAGE_KEY);
  }
}
