import { Component } from '@angular/core';
import {  Nav,NavController } from 'ionic-angular';
import { DataService } from '../../app/services/data-service';

import { ListPage } from '../list/list';
// import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
path = '/home/';
storePath= 'dataHomeItem';
splash = true;
  constructor(public navCtrl: NavController,
    public dataService: DataService,

    public nav: Nav
    // private admobFree : AdMobFree

  ) {
 this.items =this.dataService.getItems( this.path, this.storePath);

 this.dataService.notify.subscribe((data)=>{
  this.items = data;
 });
setTimeout(() => {
if( sessionStorage.getItem('count') == null){
  //this.showInterstitialAd();
  sessionStorage.setItem('count', '1');
}
},7000);
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(ListPage);
  }

  // showInterstitialAd(){
  //   const interstitialConfig: AdMobFreeInterstitialConfig= {
  //     id: 'ca-app-pub-8213425045945298/8953834325',
  //     isTesting: false,
  //     autoShow: true
  //   };
  //   this.admobFree.interstitial.config(interstitialConfig);

  //   this.admobFree.interstitial.prepare()
  //   .then(() => {
  //     this.admobFree.interstitial.show();
  //   })
  //   .catch(e => console.log(e));
  //   }
    ionViewWillLeave() {
      this.dataService.items = [];
    }
    ionViewDidLoad() {
      setTimeout(() => this.splash = false, 6000);
    }
}
