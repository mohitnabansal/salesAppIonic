import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Inventory, ProductInfo, InvetoryClass, ProductInfoClass } from './../../interface/inventory-interface';
import { Camera } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraProvider } from './../../providers/camera/camera';
import { Component,ViewChild, ElementRef ,AfterViewInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InventoryManagementProvider } from '../../providers/inventory-management/inventory-management';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { SearchProductPage } from '../search-product/search-product';

/**
 * Generated class for the ProductManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-management',
  templateUrl: 'product-management.html',
})
export class ProductManagementPage implements AfterViewInit {

  public inventoryForm: FormGroup;
  public inventClass: InvetoryClass;
  private invent:Inventory;
  public  barcodeImg :string;
  private barCodeData:BarcodeScanResult;
  @ViewChild('barCode') public barCodeImage: ElementRef;

  constructor(public navCtrl: NavController,
    public formBuild: FormBuilder,
    public navParams: NavParams,
    public invetoryService: InventoryManagementProvider,
    public cameraService:CameraProvider,
    private barcode:BarcodeScanner,
    private toast:ToastServiceProvider
  ) {

    this.invent = navParams.get("inventory") != null ? navParams.get("inventory") : new InvetoryClass(this.inventoryForm, formBuild);
    this.inventClass = new InvetoryClass(this.inventoryForm, formBuild);
    this.inventoryForm = this.inventClass.getNewForm(this.invent);
    console.log(this.inventoryForm )
    this.barcodeImg  = this.navParams.get("barcodeImg") != null ?  this.navParams.get("barcodeImg") : this.inventoryForm.get('prodInfo.prodImg.image64').value;
    this.barCodeData  = this.navParams.get("barcodeData") != null ? this.navParams.get("barcodeData") : {text:this.inventoryForm.get('prodInfo.barCodeNumber').value,format:this.inventoryForm.get('prodInfo.barcodeFormat').value} ;
    this.inventoryForm.get('prodInfo.prodImg.image64').setValue(this.barcodeImg);
    this.inventoryForm .get('prodInfo.barCodeNumber').setValue(this.barCodeData.text);
    this.inventoryForm .get('prodInfo.barcodeFormat').setValue( this.barCodeData.format);
    this.inventoryForm.get('prodInfo.productCategory').setValue(this.invent  ? this.invent.prodInfo.productCategory : "" );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductManagementPage');
    //this.barCodeImage.nativeElement.src  = this.barcodeImg ;

  }
  ngAfterViewInit(){

  }


  logForm() {
    console.log(this.invent)
    this.invetoryService.createOrUpdateInventory(this.inventoryForm.value).subscribe(
      (res) => {
        const suc = "Successfully Added New Product with Product Name" + res.prodInfo.productName;
       this.toast.showToast(suc,2000,'top');
       this.navCtrl.setRoot(SearchProductPage)
      }, (err) => {
        const failes = "Some Error occuered kindly Try Again";
        this.toast.showToast(failes,2000,'top');
        console.log(err);
      }
    );
  }
  openCamera(){
    this.cameraService.scanBarcode(this.barcode).then((res)=> {
        console.log(res['barcodeData'])
        console.log(res['barCodeImg'])
        const barcodeImg = res['barCodeImg'];
        let barCodeImageData:BarcodeScanResult = res['barcodeData']
        this.barCodeImage.nativeElement.src ="data:image/jpeg;base64," + barcodeImg;
        const barCodeNumer:BarcodeScanResult = res['barcodeData'];
        this.inventoryForm .get('prodInfo.barCodeNumber').setValue(barCodeImageData.text);
        this.inventoryForm .get('prodInfo.barcodeFormat').setValue( barCodeImageData.format);
        this.invetoryService.searchProductByBarcode(barCodeNumer.text,null).subscribe(
          (response:Inventory)=>{
            if(response.id != null){
            this.navCtrl.remove(1);
            this.navCtrl.push(ProductManagementPage,{inventory:response,barcodeImg:res['barCodeImg']});
            }
          },(error)=>{
              console.log(error)
          }
        )
      },
         rej=>{
        console.log(rej)
    });
}
}
