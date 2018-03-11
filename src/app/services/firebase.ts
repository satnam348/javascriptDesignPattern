import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  getCourseItems(path){
    return this.afd.list(path).valueChanges();
  }

  addItem(name) {
    this.afd.list('/tips/').push(name);
  }

  removeItem(id) {
    this.afd.list('/patterns/').remove(id);
  }
}
