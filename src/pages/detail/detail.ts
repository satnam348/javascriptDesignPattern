import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class detailPage {
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
