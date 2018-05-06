import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { TipsPage } from '../pages/tips/tips';
import { RSSPage } from '../pages/rss/rss';
// import { addPage } from '../pages/add-pattern/add';
import { HomePage } from '../pages/home/home';
import { javascriptPage } from '../pages/javascript/javascript';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
 
  pages: Array<{title: string, component: any}>;
  private post_data = [];
  constructor(public platform: Platform, public statusBar: StatusBar,
    
    public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Patterns', component: ListPage },
      { title: 'Tips', component: TipsPage },
      { title: 'JavaScript Blogs', component: RSSPage },
      { title: 'JavaScript Interview Questions', component: javascriptPage }
    //{ title: 'add', component: addPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
           this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  ionViewDidLoad() {
    let posts = JSON.parse(window.localStorage.getItem('posts'))
    if(posts){
      this.post_data = posts;
    }
 
  }

}
