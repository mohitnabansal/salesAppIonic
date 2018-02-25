import { InventoryManagementProvider } from './../../providers/inventory-management/inventory-management';
import { ProductManagementPage } from './../product-management/product-management';
import { Component,ViewChild, ElementRef, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SearchProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html',
})
export class SearchProductPage {


@ViewChild('productName') productName : ElementRef;

  constructor(public navCtrl: NavController,
          public navParams: NavParams,
          private cameraService: CameraProvider,
          private barcode:BarcodeScanner,
        public invetoryService:InventoryManagementProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProductPage');

  }


  searchProductByName(productName:string){
    this.invetoryService.searchProductByBarcode(productName,null).subscribe(
      (response)=>{
        this.navCtrl.push(ProductManagementPage,{inventory:response});
      },(error)=>{
        console.log(error)
      }
    )

  }

  openCamera(){
      this.cameraService.scanBarcode(this.barcode).then((res)=> {
          console.log(res)
      }, rej=>{
          console.log(rej)
      });

  }
}
