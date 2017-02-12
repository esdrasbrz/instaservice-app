import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UsuarioPage } from '../usuario/usuario';

import { UsuarioService } from '../../providers/usuario-service';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
    tabHome = HomePage;
    tabPesquisar = HomePage;
    tabUsuario = UsuarioPage;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public authService: AuthService, public usuarioService: UsuarioService) {}

    public onHome() {
        console.log('onHome');
    }

    public onPesquisar() {
        console.log('onPesquisar');
    }

    public onUsuario() {
        console.log('onUsuario');

        this.usuarioService.usuario = this.authService.usuario;
        this.usuarioService.attAll();
    }
}
