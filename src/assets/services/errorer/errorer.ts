//core
import { Injectable } from '@angular/core';

//plugins
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/**
 * @name Errorer
 * @type service 
 * @author jme
 * @since 05/02/2017
 * @description utility that shows errors on screen
 */
@Injectable()
export class Errorer {

    constructor(
        public translate: TranslateService,
        public alertCtrl: AlertController
        ) {}

    /**
     * @name showError
     * @type method
     * @author jme
     * @since 05/02/2017
     * @param errorCode: the code of the error to show 
     * @description shows an error message by a given error code
     */
    public showError(errorCode: string): void {
        let errorText: string = "";
        switch (errorCode) {
            case "auth/invalid-email": 
                errorText = this.translate.instant('error_invalidEmail');
                break;
            case "auth/user-not-found":
                errorText = this.translate.instant('error_userNotFound');
                break;
            default:
                errorText = this.translate.instant('error_generic');
                break;
        }
        let alert = this.alertCtrl.create({
            title: "Oops!",
            message: errorText,
            buttons: ["OK"]
        }).present();
    }
}