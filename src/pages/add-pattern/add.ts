import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../app/services/firebase';
@Component({
  selector: 'add',
  templateUrl: 'add.html'
})
export class addPage {
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');




  }
  addCourse(title,description){
 const newItem ={
    'pattern': title.value,
    'description':description.value
      };
      this.firebaseProvider.addItem(newItem);

}
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
