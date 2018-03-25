import { MyApp } from './../../app/app.component';
import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider,} from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the LoginSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login-signup',
  templateUrl: 'login-signup.html',
})
export class LoginSignupPage {
 loginForm: FormGroup;
  rootPage:any ;
  authType: string = "login";

  constructor(public auth: AuthServiceProvider,
    public navCtrl: NavController,
    public formBuild: FormBuilder) {

      this.loginForm = this.formBuild.group({
        username : [''],
        password : ['']
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginSignupPage');
  }



  login() {
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).then(
      (success) => {
        this.navCtrl.setRoot(MyApp);
      },
      (err) => console.log(err)
    );
}

signup(credentials) {
    this.auth.signup(credentials).then(
      (success) => {
        this.navCtrl.setRoot(MyApp);
      },
      (err) => console.log(err)
    );
}

}
