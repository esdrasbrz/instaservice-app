import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { ConfigService } from './config-service';
import { UsuarioService } from './usuario-service';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
    public usuario: any = {
        id: '',
        username: '',
        password: '',
        nome: '',
        bio: '',
        basic: ''
    };

    constructor(public http: Http, private configService: ConfigService, private storage: Storage) {
        this.storage.get('auth').then((auth) => {
            if (auth) {
                this.storage.get('usuario').then((usuario) => {
                    this.usuario = usuario;
                });
            }
        });
    }

    public login(username: string, password: string) {
        let param = {
            'username': username,
            'password': password
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let body = JSON.stringify(param);
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.post(this.configService.config.apis.usuarios + 'usuarios/check/', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    if (data.auth) {
                        data.usuario['basic'] = 'Basic ' + btoa(username + ":" + password);

                        this.usuario = data.usuario;
                        this.usuario.password = password;
                        this.storage.set('auth', true);
                        this.storage.set('usuario', this.usuario);
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

    public logout() {
        this.storage.set('auth', false);
        this.storage.remove('usuario');
    }
}
