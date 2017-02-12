import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';

/*
  Generated class for the Seguindo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-seguindo',
  templateUrl: 'seguindo.html'
})
export class SeguindoPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private usuarioService: UsuarioService, private alertCtrl: AlertController) {

    }

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

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt)
    }
}
