import { Component } from '@angular/core';

import {LocalizeMePage} from "../localize-me/localize-me";
import {FavoritesPage} from "../favorites/favorites";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LocalizeMePage;
  tab2Root = FavoritesPage;
  tab3Root = FavoritesPage;

  constructor() {

  }
}
