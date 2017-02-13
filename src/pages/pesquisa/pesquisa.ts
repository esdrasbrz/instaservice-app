import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';

import { UsuarioPage } from '../usuario/usuario';

/*
  Generated class for the Pesquisa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html'
})
export class PesquisaPage {
    query: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private usuarioService: UsuarioService, private alertCtrl: AlertController) {

    }

    public pesquisar() {
        if (this.query != "") {
            this.usuarioService.pesquisar(this.query)
                .then(data => {
                    if (data['err']) {
                        this.showError("Um erro ocorreu!");
                    } else {
                        console.log(data);
                    }
                },
                err => {
                    this.showError("Um erro ocorreu!");
                });
        }
    }

    public selUsuario(usuario) {
        new Promise(resolve => {
            this.usuarioService.usuariosPilha.push(this.usuarioService.usuario);
            resolve();
        }).then(data => {
            this.usuarioService.usuario = usuario;
            this.usuarioService.attAll();
            this.navCtrl.push(UsuarioPage);
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
