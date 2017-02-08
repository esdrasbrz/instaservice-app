import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigService {
    public config: any;

    constructor(public http: Http) {
        this.http.get('config.json')
            .subscribe(res => this.config = res.json());
    }
}
