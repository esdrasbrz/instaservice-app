import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';
import { AuthService } from '../../providers/auth-service';

import { UsuarioPage } from '../usuario/usuario';

/*
  Generated class for the Seguidores page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-seguidores',
  templateUrl: 'seguidores.html'
})
export class SeguidoresPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private usuarioService: UsuarioService, private alertCtrl: AlertController,
                private authService: AuthService) {}

    public seguir(id) {
        this.usuarioService.seguir(id)
            .then((data) => {
                if (data['err']) {
                    this.showError(data['err']);
                }
            },
            (err) => {
                this.showError(err);
            });
    }

    public removerSeguir(id) {
        this.usuarioService.removerSeguir(id)
            .then((data) => {
                if (data['err']) {
                    this.showError(data['err']);
                }
            },
            (err) => {
                this.showError(err);
            });
    }

    public selUsuario(usuario) {
        this.usuarioService.usuariosPilha.push(this.usuarioService.usuario);

        this.usuarioService.usuario = usuario;
        this.usuarioService.attAll();
        this.navCtrl.push(UsuarioPage);
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt)
    }
}
