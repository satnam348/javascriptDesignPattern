import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdsSericeProvider } from '../../app/services/add-service';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class detailPage {
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private AdsSerice :AdsSericeProvider
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.AdsSerice.showAdmobBannerAds();
  }

  ionViewWillLeave() {
    this.AdsSerice.removeBanner();
  }
 }
