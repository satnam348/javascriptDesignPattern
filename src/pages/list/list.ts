import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { detailPage } from '../detail/detail';
import { FirebaseProvider } from '../../app/services/firebase';
import { LoadingController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [FirebaseProvider]
})
export class ListPage {
  selectedItem: any;
  myInput = '';
  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController,
    private admobFree : AdMobFree
  ) {
    this.getItems('/patterns');
    this.showAdmobBannerAds();
  }

  itemTapped(event, item) {
    this.navCtrl.push(detailPage, {
      item: item
    });
  }
  onInput(event) {
    this.getItems('/patterns');
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.items =  this.items.filter((item) => {
        return (item.pattern.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
  onCancel($event) {
    this.getItems('/patterns');
  }
  getItems(path) {
    var current = new Date();
    var numberOfDaysToAdd = 6;
    if (localStorage.getItem('dataItem') == null) {
      var loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.firebaseProvider.getCourseItems(path).subscribe(data => {
        this.items = data;

        localStorage.setItem('dataItem', JSON.stringify(data));
        localStorage.setItem(
          'date',
          JSON.stringify(current.setDate(current.getDate() + numberOfDaysToAdd))
        );
        loader.dismiss();
      });
    } else {
      this.items = JSON.parse(localStorage.getItem('dataItem'));
      const getSessionDate = JSON.parse(localStorage.getItem('date'));
      var esimatedDate = new Date(getSessionDate);
      if (current > esimatedDate) {
        localStorage.removeItem('dataItem');
      }
    }
  }
  showAdmobBannerAds(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-8213425045945298/6249679746',
      isTesting: false,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
    .then(() => {
      this.admobFree.banner.show();
    })
    .catch(e => console.log(e));
    }


}
