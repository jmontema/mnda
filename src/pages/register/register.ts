//core
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

//plugins
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { ToastController } from 'ionic-angular';

//custom

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

/**
 * @name RegisterPage
 * @type page
 * @author jme
 * @since 05/02/2017
 * @description page to manage a new user registration
 */
export class RegisterPage {

  private registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public translate: TranslateService,
    public toastCtrl: ToastController
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9\._]+@[A-Za-z0-9\._]+\.[A-Za-z0-9]{2,3}$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]{4,10}$'),
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]{4,10}$'),
        Validators.minLength(4),
        Validators.maxLength(10)
      ])
        
    });
  }

  /**
   * @name processRegisterForm
   * @type method
   * @since 05/02/2017
   * @description processes and validates the entered data and generates the new user
   */
  private processRegisterForm(): void {

  }

  /**
   * @name showPasswordToast
   * @type method
   * @description shows password info toast
   */
  private showPasswordToast(): void {
    this.toastCtrl.create({
      message: this.translate.instant('registerPage_passDesc'),
      duration: 4000
    }).present();
  }

  /**
   * @name showEmailToast
   * @type method
   * @description shows email info toast
   */
  private showEmailToast(): void {
    this.toastCtrl.create({
      message: this.translate.instant('registerPage_emailDesc'),
      duration: 4000
    }).present();
  }

  /**
   * @description closes this modal
   */
  private dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
