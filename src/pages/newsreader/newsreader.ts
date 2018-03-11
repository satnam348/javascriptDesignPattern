import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
  selector: 'newsreader',
  templateUrl: 'newsreader.html'
})
export class newsreaderPage {
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private inAppBrowser: InAppBrowser) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


  }
  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      location : 'yes',//Or 'no'
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only
      toolbar : 'yes', //iOS only
      enableViewportScale : 'no', //iOS only
      allowInlineMediaPlayback : 'no',//iOS only
      presentationstyle : 'pagesheet',//iOS only
      fullscreen : 'yes',//Windows only
    }

    // Opening a URL and returning an InAppBrowserObject
    this.inAppBrowser.create(url, '_self', options);

   // Inject scripts, css and more with browser.X
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }

}
