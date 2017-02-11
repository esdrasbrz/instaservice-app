import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UsuarioPage } from '../usuario/usuario';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
    tabs = [
        {icon: "home", root: HomePage},
        {icon: "search", root: HomePage},
        {icon: "person", root: UsuarioPage}
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
