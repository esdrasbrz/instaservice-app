import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { LoginPage } from '../login/login';

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
                private loadingCtrl: LoadingController, private app: App) {
    }

    public logout() {
        this.authService.logout();
        this.app.getRootNav().setRoot(LoginPage);
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
