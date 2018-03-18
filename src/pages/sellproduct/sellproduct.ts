import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SellToCustomerPage } from './../sell-to-customer/sell-to-customer'
/**
 * Generated class for the SellproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sellproduct',
  templateUrl: 'sellproduct.html',
})
export class SellproductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellproductPage');
  }
  goTosellToCustomer(){
      
  /**Here Service calls need to be made for the verification of customer
   *       and loading fo next page with customer information Card.
   */    
      
      this.navCtrl.push(SellToCustomerPage)
  }
}
