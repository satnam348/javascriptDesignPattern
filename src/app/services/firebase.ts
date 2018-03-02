import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  getCourseItems(){
    return this.afd.list('/patterns').valueChanges();
  }

  addItem(name) {
    this.afd.list('/patterns/').push(name);
  }

  removeItem(id) {
    this.afd.list('/patterns/').remove(id);
  }
}
