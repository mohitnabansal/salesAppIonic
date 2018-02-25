import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SellproductPage } from '../pages/sellproduct/sellproduct';
import { SellToCustomerPage } from '../pages/sell-to-customer/sell-to-customer';
import { ProductManagementPage } from  '../pages/product-management/product-management';
import { UserManagmentPage } from '../pages/user-managment/user-managment';
import { UserAddPage } from '../pages/user-add/user-add';
import { SearchProductPage } from '../pages/search-product/search-product';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserCustomerServiceProvider } from '../providers/user-customer-service/user-customer-service';
import { CameraProvider } from '../providers/camera/camera';
import { InventoryManagementProvider } from '../providers/inventory-management/inventory-management';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SellproductPage,
    TabsPage,
    SellToCustomerPage,
    ProductManagementPage,
    UserManagmentPage,
    UserAddPage,
    SearchProductPage
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SellproductPage,
    TabsPage,
    SellToCustomerPage,
    ProductManagementPage,
    UserManagmentPage,
    UserAddPage,
    SearchProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    File,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserCustomerServiceProvider,
    CameraProvider,
    InventoryManagementProvider
  ]
})
export class AppModule {}
