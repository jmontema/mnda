//core
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//plugins
import { TranslateService } from 'ng2-translate';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import firebase from 'firebase';
import { AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//custom
import { TextValidator } from '../../assets/services/text-validator/text-validator';
import { DataService } from '../../assets/services/data-service/data-service';

//pages
import { HomePage } from '../home/home';
import {ForgotPassPage} from '../forgot-pass/forgot-pass';
import {RegisterPage} from '../register/register';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

/**
 * @name LoginPage
 * @type class
 * @author jme
 * @since 05/02/2017
 * @description login page, where users will do the login or recover the password if forgotten
 */
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public dataService: DataService,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    this.prepare();
  }

  /**
   * @name prepare
   * @type method
   * @author jme
   * @since 05/02/2017
   * @description prepares page before user use, checks if there is already an started session.
   * if yes, redirects to home page, else creates the login form
   */
  private prepare(): void {
    //checks if there is a current authenticated user
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      //if yes, redirects to the home page
      this.navCtrl.push(HomePage);
    } else {
      //else creates the login form
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9\._]+@[A-Za-z0-9\._]+\.[A-Za-z0-9]{2,3}$')]),
        password: new FormControl('', Validators.required)
      });
    }
  }

  /**
   * @name processLoginForm
   * @type method
   * @author jme
   * @since 05/02/2017
   * @description processes the login form, validates entered text and tries to authenticate
   */
  private processLoginForm(): void {
    if (this.loginForm.valid) {
      //cleans the text
      let email = TextValidator.cleanTextStrict(this.loginForm.value.email);
      let pass = TextValidator.cleanTextStrict(this.loginForm.value.password);
      //performs authentication
      let loginResult = this.dataService.logIn(email, pass).then(res => {
        let user = firebase.auth().currentUser;
        if (user) {
          console.log("Autenticacion correcta: " + res);
          this.storage.set("localUser", res);

        } else {
          console.log("Fallo de autenticacion.");
        }
      });
    } else {
      //if the form is not valid, informs the user with an alert
      let alert = this.alertCtrl.create({
        title: this.translate.instant('loginPage_invalidCredentials'),
        subTitle: this.translate.instant('loginPage_invalidCredentials_content'),
        buttons: ['OK']
      }).present();
    }
  }

  /**
   * @name showForgotPassModal
   * @type method
   * @description opens the recover password modal
   */
  private showForgotPassModal(): void {
    this.modalCtrl.create(ForgotPassPage).present();
  }

  /**
   * @name openRegisterPage
   * @type method
   * @description opens the register modal
   */
  private openRegisterPage(): void {
    this.modalCtrl.create(RegisterPage).present();
  }

}
