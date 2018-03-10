import { Component } from '@angular/core';
import {  Nav,NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../app/services/firebase';
import { LoadingController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];

  constructor(public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController,
    public nav: Nav,
    private admobFree : AdMobFree

  ) {
this.getItems();
setTimeout(() => {
if( sessionStorage.getItem('count') == null){
  this.showInterstitialAd();
  sessionStorage.setItem('count', '1');
}
},7000);
  }
  getItems() {
    var current = new Date();
    var numberOfDaysToAdd = 6;
    if (localStorage.getItem('dataHomeItem') == null) {
      var loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.firebaseProvider.getCourseItems('/home/').subscribe(data => {
        this.items = data;

        localStorage.setItem('dataHomeItem', JSON.stringify(data));
        localStorage.setItem(
          'homedate',
          JSON.stringify(current.setDate(current.getDate() + numberOfDaysToAdd))
        );
        loader.dismiss();
      });
    } else {
      this.items = JSON.parse(localStorage.getItem('dataHomeItem'));
      const getSessionDate = JSON.parse(localStorage.getItem('homedate'));
      var esimatedDate = new Date(getSessionDate);
      if (current > esimatedDate) {
        localStorage.removeItem('dataHomeItem');
      }
    }
  }
  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(ListPage);
  }

  showInterstitialAd(){
    const interstitialConfig: AdMobFreeInterstitialConfig= {
      id: 'ca-app-pub-8213425045945298/8953834325',
      isTesting: false,
      autoShow: true
    };
    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.interstitial.prepare()
    .then(() => {
      this.admobFree.interstitial.show();
    })
    .catch(e => console.log(e));
    }

}
