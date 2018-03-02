import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { detailPage } from '../detail/detail';
import { FirebaseProvider } from '../../app/services/firebase';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: "page-list",
  templateUrl: "list.html",
  providers: [FirebaseProvider]
})
export class ListPage {
  selectedItem: any;

  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getItems();
  }

  itemTapped(event, item) {
    this.navCtrl.push(detailPage, {
      item: item
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  }
  getItems() {
    if (localStorage.getItem("dataItem") == null) {
      var loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      // this.presentLoading();
        this.firebaseProvider.getCourseItems().subscribe(data => {
        this.items = data;
        localStorage.setItem("dataItem", JSON.stringify(data));
        loader.dismiss();
      });
    } else {
      this.items = JSON.parse(localStorage.getItem("dataItem"));
    }
  }
}
