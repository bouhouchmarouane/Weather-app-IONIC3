import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {LocalizeMePage} from "../localize-me/localize-me";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LocalizeMePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
