import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigService } from './config-service';
import { AuthService } from './auth-service';

/*
  Generated class for the UsuarioService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuarioService {
    seguidores: any = [];
    seguindo: any = [];

    constructor(public http: Http, private configService: ConfigService,
                private authService: AuthService) {
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

    public attSeguidores() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + this.authService.usuario.id + '/seguidores/', { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    this.seguidores = data;
                    resolve(data);
                },
                err => {
                    this.seguidores = [];
                    resolve({
                        err: 'Erro ao atualizar seguidores!'
                    });
                });
        });
    }

    public attSeguindo() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + this.authService.usuario.id + '/seguindo/', { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    this.seguindo = data;
                    resolve(data);
                },
                err => {
                    this.seguindo = [];
                    resolve({
                        err: 'Erro ao atualizar seguindo!'
                    });
                });
        });
    }

    public attAll() {
        this.attSeguidores();
        this.attSeguindo();
    }
}
