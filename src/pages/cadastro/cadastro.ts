import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';

/*
  Generated class for the Cadastro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
    loading: Loading;

    usuario = {
        nome: '',
        username: '',
        password: ''
    };
    passConfirm: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private usuarioService: UsuarioService, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {}

    public cadastrar() {
        this.showLoading();
        this.usuarioService.cadastrar(this.usuario)
            .then(data => {
                setTimeout(() => {


                    if (data['err']) {
                        if (data['err']['code'] == "ER_DUP_ENTRY") {
                            this.showError("Nome de usuário não se encontra disponível!");
                        } else {
                            this.showError("Um erro ocorreu!");
                        }
                    } else {
                        this.loading.dismiss();

                        this.navCtrl.pop();
                        this.alertCtrl.create({
                            title: 'Sucesso',
                            subTitle: data['message'],
                            buttons: ['OK']
                        }).present();
                    }
                });
            },
            err => {
                console.log('Erro: ' + err);
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: "Aguarde..."
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            if (this.loading)
                this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt)
    }
}
