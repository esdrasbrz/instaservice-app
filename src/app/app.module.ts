import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';

import { ConfigService } from '../providers/config-service';
import { AuthService } from '../providers/auth-service';
import { UsuarioService } from '../providers/usuario-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      ConfigService,
      AuthService,
      UsuarioService,
  ]
})
export class AppModule {}
