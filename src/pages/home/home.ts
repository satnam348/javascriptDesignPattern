import { Component } from '@angular/core';
import {  Nav,NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../app/services/firebase';
import { LoadingController } from 'ionic-angular';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  constructor(public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController,
    public nav: Nav

  ) {
this.getItems();
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
}
