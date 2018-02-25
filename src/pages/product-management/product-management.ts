import { Inventory, ProductInfo, InvetoryClass, ProductInfoClass } from './../../interface/inventory-interface';
import { Camera } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraProvider } from './../../providers/camera/camera';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InventoryManagementProvider } from '../../providers/inventory-management/inventory-management';
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
export class ProductManagementPage {

  private inventoryForm: FormGroup;
  public invent: InvetoryClass;
  public inventInt: Inventory;
  constructor(public navCtrl: NavController,
    public formBuild: FormBuilder,
    public navParams: NavParams,
    public invetoryService: InventoryManagementProvider
  ) {
    this.invent = this.navParams.get("inventory") != null ? this.navParams.get("inventory") : new InvetoryClass(this.inventoryForm, this.formBuild);
    this.inventoryForm = this.invent.getNewForm(this.inventInt);
    console.log(this.inventoryForm)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductManagementPage');

  }

  logForm() {
    this.invetoryService.createOrUpdateInventory(this.invent).subscribe(
      (res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      }
    );
  }
}


