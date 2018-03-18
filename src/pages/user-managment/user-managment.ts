import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController, Platform } from 'ionic-angular';
import { UserAddPage } from './../user-add/user-add';
import { UserCustomerServiceProvider } from './../../providers/user-customer-service/user-customer-service';
import { CustomerInfoInterface } from './../../interface/customer-info-interface';
/**
 * Generated class for the UserManagmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-managment',
  templateUrl: 'user-managment.html',
})
export class UserManagmentPage {

    private customerInfo:CustomerInfoInterface;
    private phoneNumber:string; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
          private customerSerive:UserCustomerServiceProvider,
          public actionsheetCtrl: ActionSheetController,
          public platform: Platform
         ) {
      this.customerInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManagmentPage');
  }


  searchUser(phoneNumber:string){
      let actionSheetEdit = this.actionsheetCtrl.create({
          title: 'Customer Info Options',
          buttons: [
            {
              text: 'View/Edit Customer Info',
              icon: !this.platform.is('ios') ? 'trash' : null,
              handler: () => {
                  this.navCtrl.push(UserAddPage,{cust:this.customerInfo});                   
              }
            },
            {
              text: 'Cancel',
              role: 'cancel', // will always sort to be on the bottom
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      let actionSheetAdd = this.actionsheetCtrl.create({
          title: 'Customer Info Options',
          buttons: [
            {
                text: 'Add New Customer Info',
                icon: !this.platform.is('ios') ? 'trash' : null,
                handler: () => {
                    this.navCtrl.push(UserAddPage,{cust:this.customerInfo});                    
                }
              },
            {
              text: 'Cancel',
              role: 'cancel', // will always sort to be on the bottom
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      this.customerSerive.searchuser(phoneNumber).subscribe(data=>{
           this.customerInfo = data;
           if(this.customerInfo.id == null){
               this.customerInfo.customerPhone= +phoneNumber;
               actionSheetAdd.present();
           }
           else{               
               actionSheetEdit.present();
           }
       
         
      },err=>{
       console.log(err);       
      })
  //Check if User Exist
  //Show Pop-Up to Add User
  //Pass User-Add page with name and number pre-filled
      
      
  }
  
}
