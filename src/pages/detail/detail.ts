import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class detailPage {
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,  private admobFree : AdMobFree) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    setTimeout(() => {
      this.showInterstitialAd();
  }, 9000);

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
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
