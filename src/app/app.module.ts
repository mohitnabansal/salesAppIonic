import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { Screenshot } from '@ionic-native/screenshot';
import { IonicStorageModule } from '@ionic/storage';



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
import { LoginSignupPage } from '../pages/login-signup/login-signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserCustomerServiceProvider } from '../providers/user-customer-service/user-customer-service';
import { CameraProvider } from '../providers/camera/camera';
import { InventoryManagementProvider } from '../providers/inventory-management/inventory-management';
import { FileServiceProvider } from '../providers/file-service/file-service';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

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
    SearchProductPage,
    LoginSignupPage

  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      storeName:'_saleLoginSignupPagesDb',
     driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
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
    SearchProductPage,
    LoginSignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    File,
    Camera,
    FilePath,
    Screenshot,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserCustomerServiceProvider,
    CameraProvider,
    InventoryManagementProvider,
    FileServiceProvider,
    ToastServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
