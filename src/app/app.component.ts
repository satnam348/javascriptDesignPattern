import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { TipsPage } from '../pages/tips/tips';
import { RSSPage } from '../pages/rss/rss';
// import { addPage } from '../pages/add-pattern/add';
import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  private post_data = [];
  constructor(public platform: Platform, public statusBar: StatusBar,
    private fcm: FCM,
    private ionStore: Storage,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    if ( this.platform.is('android') ) {
      this.platform.ready().then(() => {
           this.statusBar.overlaysWebView(false);
           this.statusBar.backgroundColorByHexString('#2876ff');


          this.fcm.subscribeToTopic('post_update');
          this.fcmProcess();
      });
  }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Patterns', component: ListPage },
      { title: 'Tips', component: TipsPage },
      { title: 'JavaScript Blogs', component: RSSPage }
    // { title: 'add', component: addPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#3177f5")
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
  private fcmProcess() {
    this.fcm.onNotification().subscribe(data => {
      let post_obj = {
        title: data.title,
        description: data.description,
        date: data.updated_at
      };
      if(data.wasTapped){
        console.log("Received in Background");
        let posts = window.localStorage.getItem('posts');
        let db_data = [];
        if(posts){
          db_data = JSON.parse(posts);
        }
        db_data.push(post_obj);
        window.localStorage.setItem('posts',JSON.stringify(db_data));
      }else{
        console.log("Received in Foreground");
        this.post_data.push(post_obj)
        console.log(this.post_data);
        this.ionStore.set('posts', JSON.stringify(this.post_data));
      }
    });
  }
}
