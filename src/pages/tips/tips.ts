import { Component } from '@angular/core';
import { NavController, NavParams , Platform} from 'ionic-angular';
import { detailPage } from '../detail/detail';
import { DataService } from '../../app/services/data-service';
import { AdsSericeProvider } from '../../app/services/add-service';
@Component({
  selector: "app-tips",
  templateUrl: "tips.html"
})
export class TipsPage {
  selectedItem: any;
  myInput = "";
  items = [];
  path = '/tips';
  storePath= 'jsTips';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public dataService: DataService,
    private AdsSerice :AdsSericeProvider,
  ) {
    this.items = this.dataService.getItems( this.path, this.storePath);
    this.dataService.notify.subscribe((data)=>{
      this.items = data;
     });
     this.AdsSerice.showAdmobBannerAds();
  }

  itemTapped(event, item) {
    item.tips = true;
    this.navCtrl.push(detailPage, {
      item: item
    });
  }

  ionViewWillLeave() {
    if (this.plt.is("android")) {
      this.AdsSerice.removeBanner();
    }
    this.dataService.items = [];
  }

}
