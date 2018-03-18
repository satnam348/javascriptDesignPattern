import { Component } from '@angular/core';
import { NavController, NavParams , Platform} from 'ionic-angular';
import { detailPage } from '../detail/detail';
import { DataService } from '../../app/services/data-service';
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  selectedItem: any;
  myInput = "";
  items = [];
  path = '/patterns';
  storePath= 'dataItem';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public dataService: DataService,
  ) {
    this.items = this.dataService.getItems( this.path, this.storePath);
    this.dataService.notify.subscribe((data)=>{
      this.items = data;
     });
  }

  itemTapped(event, item) {
    this.navCtrl.push(detailPage, {
      item: item
    });
  }
  onInput(event) {
    this.items = this.dataService.getItems( this.path, this.storePath);
    let val = event.target.value;
    if (val && val.trim() != "") {
      this.items = this.items.filter(item => {
        return item.pattern.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
  onCancel($event) {
    this.items = this.dataService.getItems( this.path, this.storePath);
  }


  ionViewWillLeave() {
    this.dataService.items = [];
  }
}
