import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LocalizeMePage} from "../pages/localize-me/localize-me";
import { WeatherProvider } from '../providers/weather/weather';
import {HttpModule} from "@angular/http";
import { CitiesImagesProvider } from '../providers/cities-images/cities-images';
import {IonicStorageModule} from "@ionic/storage";
import {FavoritesPage} from "../pages/favorites/favorites";
import { FavoriteProvider } from '../providers/favorite/favorite';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LocalizeMePage,
    FavoritesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LocalizeMePage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    CitiesImagesProvider,
    FavoriteProvider
  ]
})
export class AppModule {}
