import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { ConfigService } from './config-service';
import { AuthService } from './auth-service';

/*
  Generated class for the UsuarioService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuarioService {
    private readonly TAM_PAG: number = 20;
    private pagPesquisa: number = 1;

    public usuarios: Array<any> = [];

    public usuario: any = {
        id: '',
        username: '',
        password: '',
        nome: '',
        bio: '',
        basic: ''
    };
    public usuariosPilha: Array<any> = [];

    seguidores: any = [];
    numSeguidores: string = '0';
    private pagSeguidores: number = 1;

    seguindo: any = [];
    numSeguindo: string = '0';
    private pagSeguindo: number = 1;

    userSeguindo: Array<number> = [];

    constructor(public http: Http, private configService: ConfigService,
                private authService: AuthService, private storage: Storage) {
        this.attUserSeguindo();
    }

    public pesquisar(query) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        this.pagPesquisa = 1;
        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + query + '/search/' + this.TAM_PAG + "/1/", { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    this.usuarios = data;
                    resolve(data);
                },
                err => {
                    this.usuarios = [];
                    resolve({
                        err: 'Erro ao atualizar seguidores!'
                    });
                });
        });
    }

    public scrollPesquisa(query) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        this.pagPesquisa += 1;
        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + query + '/search/' + this.TAM_PAG + "/" + this.pagPesquisa, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    this.usuarios = this.usuarios.concat(data);
                    resolve(data);
                },
                err => {
                    resolve({
                        err: 'Erro ao atualizar seguidores!'
                    });
                });
        });
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

    public alterar(dados) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        let body = JSON.stringify(dados);
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.put(this.configService.config.apis.usuarios + 'usuarios/' + this.authService.usuario.id, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    if (dados.password) {
                        this.authService.usuario.password = dados.password;
                    }

                    this.authService.login(this.authService.usuario.username, this.authService.usuario.password);
                    resolve(data);
                },
                err => {
                    resolve({
                        err: 'Um erro ocorreu!'
                    });
                });
        });
    }

    public attSeguidores() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + this.usuario.id + '/seguidores/', { headers: headers })
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

        this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + this.usuario.id + '/seguindo/count/', { headers: headers })
            .map(res => res.json())
            .subscribe(data => {
                this.numSeguindo = data[0].qtd;
            },
            err => {
                this.numSeguindo = '0';
            });

        this.pagSeguindo = 1;
        return new Promise(resolve => {
            this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + this.usuario.id + '/seguindo/' + this.TAM_PAG + '/1/', { headers: headers })
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

    public attUserSeguindo() {
        return new Promise(resolve => {
            this.storage.get('usuario').then((usuario) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', usuario.basic);

                this.http.get(this.configService.config.apis.usuarios + 'usuarios/' + usuario.id + '/seguindo/', { headers: headers })
                    .map(res => res.json())
                    .subscribe(data => {
                        for (let user of data) {
                            this.userSeguindo.push(user.id);
                        }

                        resolve(data);
                    },
                    err => {
                        this.userSeguindo = [];
                        resolve({
                            err: 'Erro ao atualizar seguindo!'
                        });
                    });
            });
        });
    }

    public seguir(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        let body = JSON.stringify({});
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.post(this.configService.config.apis.usuarios + 'arestas/' + this.authService.usuario.id + "/" + id, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    this.userSeguindo.push(id);

                    resolve(data);
                },
                err => {
                    resolve({
                        err: 'Um erro ocorreu!'
                    });
                });
        });
    }

    public removerSeguir(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.usuario.basic);

        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            this.http.delete(this.configService.config.apis.usuarios + 'arestas/' + this.authService.usuario.id + "/" + id, options)
                .map(res => res.json())
                .subscribe(data => {
                    delete this.userSeguindo[this.userSeguindo.indexOf(id)];

                    resolve(data);
                },
                err => {
                    resolve({
                        err: 'Um erro ocorreu!'
                    });
                });
        });
    }

    public attAll() {
        this.attSeguidores();
        this.attSeguindo();
    }
}
