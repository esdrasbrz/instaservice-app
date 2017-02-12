import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario-service';

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
                private usuarioService: UsuarioService) {}
}
