// import { Component } from '@angular/core';
// import { NavController, NavParams , Platform} from 'ionic-angular';
// import {FeedService } from '../../app/services/http.service';

// @Component({
//   selector: "app-setting",
//   templateUrl: "setting.html"
// })
// export class SettingPage {
//   selectedTheme: String;
//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     public settings : FeedService

//   ) {
//     this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
//    }

//   itemTapped(event, item) {

//   }

//   onChange(i) {
//     if (this.selectedTheme === 'dark-theme') {
//       this.settings.setActiveTheme('light-theme');
//     } else {
//       this.settings.setActiveTheme('dark-theme');
//     }
//   }
// }
