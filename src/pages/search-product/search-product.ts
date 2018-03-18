import { map } from 'rxjs/operators';
import { Inventory, ProductInfo } from './../../interface/inventory-interface';
import { InventoryManagementProvider } from './../../providers/inventory-management/inventory-management';
import { ProductManagementPage } from './../product-management/product-management';
import { Component,ViewChild, ElementRef, Input, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera';
import { BarcodeScanner,BarcodeScanResult } from '@ionic-native/barcode-scanner';

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

@ViewChild('cameraImg') cameraImg: ElementRef;
@ViewChild('productName') productName : ElementRef;
@Input('productStr') productStr :string;
public items:{};

  constructor(public navCtrl: NavController,
          public navParams: NavParams,
          private cameraService: CameraProvider,
          private barcode:BarcodeScanner,
        public invetoryService:InventoryManagementProvider) {
          this.items = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProductPage');

  }
  onCancel(evnt:any){
    console.log("Cancel");
console.log(evnt);


  }

  getProductPage(ev:any){
console.log(ev);
this.invetoryService.searchProductByNameId(ev).subscribe(
  (res)=>{
    delete this.items;
 this.navCtrl.push(ProductManagementPage,{inventory:res});
  },
(err)=>{
  delete this.items;
  this.navCtrl.push(ProductManagementPage,{inventory:null});
})
  }

  searchProductByName(evnt:any){
    this.items = new Array();
   const prodName =  evnt.target.value;
   if(prodName && prodName.trim()!=''){
    this.invetoryService.searchProductByLike(prodName).subscribe(
      (response)=>{
    response.map((k,v)=>{
      console.log(k.productName)
    this.items[v] = {id:k.id,name:k.productName};
    })
      },(error)=>{
        delete this.items;
        console.log(error)
      }
    )
  }

  }

  openCamera(){

      this.cameraService.scanBarcode(this.barcode).then((res)=> {
          console.log(res['barcodeData'])
          console.log(res['barCodeImg'])
        const barCodeNumer:BarcodeScanResult = res['barcodeData'];
          this.invetoryService.searchProductByBarcode(barCodeNumer.text,null).subscribe(
            (response:Inventory)=>{
              if(response.id != null){
              this.navCtrl.push(ProductManagementPage,{inventory:response,barcodeImg:res['barCodeImg'],barcodeData:res['barcodeData']});
              }else{
                this.navCtrl.push(ProductManagementPage,{inventory:null,barcodeImg:res['barCodeImg'],barcodeData:res['barcodeData']});
              }
            },(error)=>{
              this.navCtrl.push(ProductManagementPage,{inventory:null,barcodeImg:res['barCodeImg'],barcodeData:res['barcodeData']});
              console.log(error)
            }
          )

      }, rej=>{
          console.log(rej)
      });

  }
}
