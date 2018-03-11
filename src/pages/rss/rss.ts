import { Component } from '@angular/core';
import { NavController, NavParams , Platform} from 'ionic-angular';
import { newsreaderPage } from '../newsreader/newsreader';
import { FeedService } from '../../app/services/http.service';

@Component({
  selector: "app-rss",
  templateUrl: "rss.html"
})
export class RSSPage {
  selectedItem: any;
  myInput = "";
  items = [];
  path = 'https://blog.angular.io/feed';
  storePath= 'jsTips';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public feedService: FeedService
  ) {
     this.feedService.getFeedContent(this.path).subscribe((data)=>{
      this.items = data;
    });
      // this.dataService.showAdmobBannerAds();
  }

  itemTapped(event, item) {
    item.rss = true;
    this.navCtrl.push(newsreaderPage, {
      item: item
    });
  }

  ionViewWillLeave() {

}
}
