//core
import { Injectable } from '@angular/core';

//plugins
import { TranslateService } from 'ng2-translate';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

//custom
import { Errorer } from '../errorer/errorer';

/**
 * @name DataService
 * @type class
 * @author jme
 * @since 05/02/2017
 * @description firebase management class
 */
@Injectable()
export class DataService {

    constructor(
        public translate: TranslateService,
        public alertCtrl: AlertController,
        public errorer: Errorer
    ) { }

    /**
     * @name init()
     * @type function
     * @since 05/02/2017
     * @author jme
     * @description initializes firebase module
     */
    public init(): void {
        firebase.initializeApp({
            apiKey: "AIzaSyD3kCDshkeaMmwWTuQffNvX3K1uKZsPL7A",
            authDomain: "mnda-82868.firebaseapp.com",
            databaseURL: "https://mnda-82868.firebaseio.com",
            storageBucket: "mnda-82868.appspot.com",
            messagingSenderId: "960946176100"
        });
    }

    /**
     * @name logIn
     * @type method
     * @author jme
     * @since 05/02/2017
     * @param user : user name to authenticate
     * @param pass : user password to authenticate
     * @return boolean : true if successfully authenticated, false if not
     * @description authenticates an user, given its email and password
     */
    public logIn(user: string, pass: string): firebase.Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(user, pass).catch((err: any) => {
            this.errorer.showError(err.code);
        });
    }

    public sendRecoverMail(mail: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(mail).catch((err: any) => {
            this.errorer.showError(err.code);
        });
    }

}