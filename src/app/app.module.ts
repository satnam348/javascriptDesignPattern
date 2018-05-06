import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { FirebaseProvider } from './services/firebase';
// import { AdMobFree } from '@ionic-native/admob-free';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { detailPage } from '../pages/detail/detail';
import {addPage} from '../pages/add-pattern/add';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {DataService} from './services/data-service';
import { TipsPage } from '../pages/tips/tips';
import { RSSPage } from '../pages/rss/rss';
import { newsreaderPage } from '../pages/newsreader/newsreader';
import { FeedService } from './services/http.service';
// import { AdsSericeProvider } from './services/add-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {javascriptPage} from '../pages/javascript/javascript';
const config = {
  apiKey: "AIzaSyBiuB_aNOSTCWyvIRHIdE5Np3M7KSGtkFo",
    authDomain: "javascript-bec12.firebaseapp.com",
    databaseURL: "https://javascript-bec12.firebaseio.com",
    projectId: "javascript-bec12",
    storageBucket: "javascript-bec12.appspot.com",
    messagingSenderId: "871945422885"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    detailPage,
    addPage,
    TipsPage,
    RSSPage,
    newsreaderPage,
    javascriptPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    detailPage,
    addPage,
    TipsPage,
    RSSPage,
    newsreaderPage,
    javascriptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    DataService,
    FeedService,
    //AdsSericeProvider,
    InAppBrowser,
    // AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
