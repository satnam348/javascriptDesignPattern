import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { DataService } from './data-service'

import xml2js from 'xml2js';
interface Responses {
  _body: string;
}
@Injectable()
export class FeedService {
  constructor(
    private http: Http,
    public  dataService: DataService
  ) { }

getFeedContent(url: string): Observable<any> {
this.dataService.loaderStart();

    return  this.http.get('https://www.javascript.com/feed/rss')
            .map(this.extractFeeds.bind(this))
            .catch(this.handleError.bind(this));
  }

  private extractFeeds(res: Responses) {

let a: any = {};
a.resp = this.convertToJson(res._body);
let feed =  a.resp.rss.channel.item  ;
localStorage.setItem('feeds',JSON.stringify(feed));
    this.dataService.loaderClose();
    return feed || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    this.dataService.loaderClose();
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public convertToJson(data: string): Object {

        let res;

        // setting the explicitArray option prevents an array structure
        // where every node/element is always wrapped inside an array
        // set it to true, and see for yourself what changes
        xml2js.parseString(data, { explicitArray: false }, (error, result) => {

          if (error) {
            throw new Error(error);
          } else {
            res = result;
          }

        });

        return res;

      }


      public convertToXml(rootObject:Object) {

        return new xml2js.Builder().buildObject(rootObject);

      }
}
