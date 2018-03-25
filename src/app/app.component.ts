import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { SellproductPage }  from '../pages/sellproduct/sellproduct';
import { ProductManagementPage } from  '../pages/product-management/product-management';
import { UserManagmentPage } from '../pages/user-managment/user-managment';
import { HomePage } from '../pages/home/home';
import { SearchProductPage } from '../pages/search-product/search-product';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {LoginSignupPage} from '../pages/login-signup/login-signup';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginSignupPage;
  menuContent:Array<string>;

  @ViewChild('myNav') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth: AuthServiceProvider) {

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

      }

  ngOnInit() {
      this.setItems();
      console.log("My App Loaded");
      this.auth.authenticated().then(dat=>{
if(dat){
  console.log(dat)
  this.rootPage =  SellproductPage;
}
      }).catch(res=>{
console.error("something went wrong");
      })



    }
  //This values Should be fetched from server end
  setItems(){
      this.menuContent=['Sell Product','User Management','Product Management','Product Catalog']
  }


  openPage(p){
      switch(p){
      case 'Sell Product':
          this.nav.setRoot(SellproductPage);
          break;
      case 'User Management':
          this.nav.setRoot(UserManagmentPage);
          break;
      case 'Product Management':
          this.nav.setRoot(SearchProductPage);
          break;
      default :
          this.nav.setRoot(HomePage);
          break;
      };

      //alert(p)
  }
}
