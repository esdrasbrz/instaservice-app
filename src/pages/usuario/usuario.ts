import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { UsuarioService } from '../../providers/usuario-service';

import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';
import { SeguidoresPage } from '../seguidores/seguidores';
import { SeguindoPage } from '../seguindo/seguindo';

/*
  Generated class for the Usuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {
    loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private authService: AuthService, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController, private app: App,
                private usuarioService: UsuarioService) {
    }

    public logout() {
        this.authService.logout();
        this.app.getRootNav().setRoot(LoginPage);
    }

    public abrirPerfil() {
        this.navCtrl.push(PerfilPage);
    }

    public abrirSeguidores() {
        this.navCtrl.push(SeguidoresPage);
    }

    public abrirSeguindo() {
        this.navCtrl.push(SeguindoPage);
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
