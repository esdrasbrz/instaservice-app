import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigService } from './config-service';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
    public usuario: any;

    constructor(public http: Http, private configService: ConfigService) {
    }

    public login(username: string, password: string) {
        let param = {
            'username': username,
            'password': password
        }
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        let body = JSON.stringify(param);
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.post(this.configService.config.apis.usuarios + 'usuarios/check/', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);

                    if (data.auth) {
                        this.usuario = data.usuario;
                    }

                    resolve(data);
                },
                err => {
                    resolve({
                        err: 'Não foi possível se conectar ao servidor!'
                    });
                });
        });
    }
}
