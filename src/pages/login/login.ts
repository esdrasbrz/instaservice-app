import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { HomePage } from '../home/home';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    loading: Loading;

    username: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private authService: AuthService, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {}

    public login() {
        this.showLoading();
        this.authService.login(this.username, this.password)
            .then(data => {
                if (data['auth']) {
                    setTimeout(() => {
                        this.loading.dismiss();
                        console.log(this.authService.usuario);
                        this.navCtrl.setRoot(HomePage);
                    });
                } else {
                    this.showError('Acesso não permitido!');
                }
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
