//core
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//plugins
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

//custom
import { Errorer } from '../assets/services/errorer/errorer';
import { DataService } from '../assets/services/data-service/data-service';

//pages
import { LoginPage } from '../pages/login/login';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ForgotPassPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ForgotPassPage,
    RegisterPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    Errorer,
    DataService
  ]
})
export class AppModule { }
