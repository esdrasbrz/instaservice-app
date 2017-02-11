import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigService } from './config-service';

/*
  Generated class for the UsuarioService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuarioService {
    constructor(public http: Http, private configService: ConfigService) {
    }

    public cadastrar(usuario) {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let body = JSON.stringify(usuario);
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.post(this.configService.config.apis.usuarios + 'usuarios/', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                },
                err => {
                    resolve({
                        err: JSON.parse(err._body)
                    });
                });
        });
    }
}
