import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {

  constructor(public http: HttpClient,
    private toastCtrl: ToastController) {
    console.log('Hello ToastServiceProvider Provider');
  }

  showToast(text:string,duration:number,pos:string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: pos
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
