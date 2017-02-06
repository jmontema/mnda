//core
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

//custom
import { TextValidator } from '../../assets/services/text-validator/text-validator';
import { DataService } from '../../assets/services/data-service/data-service';
import { Errorer } from '../../assets/services/errorer/errorer';

//plugins
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html'
})

/**
 * @name ForgotPassPage
 * @type page
 * @author jme
 * @since 05/02/2017
 * @description page to manage password recovery
 */
export class ForgotPassPage {

  private email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public errorer: Errorer,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public viewCtrl: ViewController
    ) { }

  /**
   * @name sendMail
   * @type method
   * @since 05/02/2017
   * @description validates given mail and then sends a password recover email using the firebase service
   */
  private sendMail(): void {
    if (this.email != null && this.email != "") {
      this.email = TextValidator.cleanTextStrict(this.email);
      this.dataService.sendRecoverMail(this.email).then(res => {
        this.alertCtrl.create({
          title: this.translate.instant('forgotPass_emailEnviadoTitle'),
          message: this.translate.instant('forgotPass_emailEnviadoContent'),
          buttons: ["OK"]
        }).present().then(fin => {
          this.navCtrl.pop();
        });
      });
    } else {
      this.errorer.showError('auth/invalid-email');
    }

  }

  /**
   * @description closes the modal
   */
  private dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
