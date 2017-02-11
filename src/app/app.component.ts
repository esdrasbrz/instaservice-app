import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { AuthService } from '../providers/auth-service';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage;

    constructor(platform: Platform, storage: Storage, authService: AuthService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            storage.get('auth').then((auth) => {
                if (auth) {
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = LoginPage;
                }
            });
        });
    }
}
