import { Injectable,EventEmitter } from '@angular/core';
import { FirebaseProvider } from './firebase';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataService {
loadingStart;
loadingEnd;
items;
public notify: EventEmitter<any> = new EventEmitter();
  constructor(
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController,

  ) { }
  getItems(path,storagePath) {
    var current = new Date();
    var numberOfDaysToAdd = 6;
    if (localStorage.getItem(storagePath) == null) {
    //this.loaderStart();
      this.firebaseProvider.getCourseItems(path).subscribe(data => {
        this.items = data;
        this.notify.next(data);
        localStorage.setItem(storagePath, JSON.stringify(data));
        localStorage.setItem(
          "date",
          JSON.stringify(current.setDate(current.getDate() + numberOfDaysToAdd))
        );
      //  this.loaderClose();
      },error => {alert("error"+ JSON.stringify(error))});
    } else {
      this.items = JSON.parse(localStorage.getItem(storagePath));
      const getSessionDate = JSON.parse(localStorage.getItem("date"));
      var esimatedDate = new Date(getSessionDate);
      if (current > esimatedDate) {
        localStorage.removeItem(storagePath);
      }
    }
     return this.items;
  }
loaderStart(){
  this.loadingStart = this.loadingCtrl.create({
    content: "Please wait..."
  });
  this.loadingStart.present();
}
loaderClose(){
  this.loadingStart.dismiss();
}
}
