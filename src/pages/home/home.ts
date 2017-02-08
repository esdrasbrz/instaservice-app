import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    constructor(public navCtrl: NavController, public configService: ConfigService) {
    }
}
