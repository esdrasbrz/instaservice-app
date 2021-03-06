import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
    loading: Loading;

    bio: string;
    nome: string;
    senhaAntiga: string;
    senha: string;
    alterarSenha: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private usuarioService: UsuarioService, private authService: AuthService) {
        this.bio = authService.usuario.bio;
        this.nome = authService.usuario.nome;
        this.alterarSenha = false;
    }

    public salvar() {
        this.showLoading();
        let dados = {};
        dados['nome'] = this.nome;
        dados['bio'] = this.bio;

        if (this.alterarSenha) {
            // precisa checar a senha antiga
            if (this.senhaAntiga !== this.authService.usuario.password) {
                this.showError("A senha antiga não confere!");
                return;
            }

            dados['password'] = this.senha;
        }

        this.usuarioService.alterar(dados)
            .then(data => {
                setTimeout(() => {
                    if (data['err']) {
                        this.showError(data['err']);
                    } else {
                        this.loading.dismiss();

                        this.navCtrl.pop();
                        this.alertCtrl.create({
                            title: 'Sucesso',
                            subTitle: 'Perfil salvo com sucesso!',
                            buttons: ['OK']
                        }).present();
                    }
                });
            },
            err => {
                this.showError(err);
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
