//core
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//plugins
import { TranslateService } from 'ng2-translate';
import firebase from 'firebase';

//custom
import { DataService } from '../assets/services/data-service/data-service';

//pages
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html',
  providers: [DataService]
})

export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform,
    public translate: TranslateService,
    public dataService: DataService) {

    this.config(); //launches basic application config
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
    });
  }

  /**
   * @name config()
   * @author jme
   * @since 05/02/2017
   * @description launches starting application configuration
   */
  config(): void {  

    //starts firebase service
    this.dataService.init();    
    //translator configuration
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    StatusBar.styleDefault();
    Splashscreen.hide();
  }
}
