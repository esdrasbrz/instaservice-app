import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
                private usuarioService: UsuarioService) {}
}
