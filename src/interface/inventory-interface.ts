import { ProductInfo } from './inventory-interface';
import {  OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ImageStore, ImageStoreI } from './image-store-interface';
export interface Inventory{

    id : string;
    prodInfo : ProductInfo;
    version:number;
    versionHistory : ProductInfo[];

}

export interface ProductInfo{

    barcodeFormat : string;
    barCodeNumber : number;
    CurrProdPrice : number;
    id : string
    prodDiscPrice : number;
    prodImg : ImageStore;
    productDescp : string;
    productName : string;
    productVerion : number
    lastUpdatedOn:Date;
    productCategory:string;
}

export class InvetoryClass implements Inventory, OnInit {

  id : string;
  prodInfo : ProductInfo;
  version:number = null;
  versionHistory : ProductInfo[];
  public imageStore:ImageStoreI
  constructor(
    public newForm:FormGroup,
   public formBuild:FormBuilder,

   ){

    this.prodInfo =  new ProductInfoClass();
    this.imageStore = new ImageStoreI(newForm,formBuild);
    //this.versionHistory = new Array<ProductInfoClass>();

  }

  ngOnInit(){

  }
 getNewForm(data:Inventory):FormGroup{
  this.newForm=this.formBuild.group({
    id:[null],
    version:[''],
    prodInfo : this.createItem(data.prodInfo),
   // versionHistory :this.formBuild.array([this.createItem()])

  });
  return this.newForm;
}
createItem(prodInfo:ProductInfo): FormGroup {
  try{
    if(typeof prodInfo.id == 'undefined'){
      prodInfo = new ProductInfoClass();
    }
  }catch(err){
     console.log("Data Related to the Scanned Product Not Found");
  }
  return this.formBuild.group({
    barcodeFormat : [prodInfo.barcodeFormat],
    barCodeNumber : [prodInfo.barCodeNumber],
    CurrProdPrice : [prodInfo.CurrProdPrice],
    id : [prodInfo.id],
    prodDiscPrice : [prodInfo.prodDiscPrice],
    prodImg : this.imageStore.getNewForm(prodInfo.prodImg),
    productDescp : [prodInfo.productDescp],
    productName : [prodInfo.productName],
    productVerion : [prodInfo.productVerion],
    lastUpdatedOn:[prodInfo.lastUpdatedOn],
    productCategory:[prodInfo.productCategory]
  })
}
}


export class ProductInfoClass implements ProductInfo{

    barcodeFormat : string = '';
    barCodeNumber : number  = null;
    CurrProdPrice : number = null;
    id : string = null;
    prodDiscPrice : number = null;
    prodImg : ImageStore = new ImageStoreI(null,null);
    productDescp : string = '';
    productName : string = '';
    productVerion : number = null;
    lastUpdatedOn:Date = null;
    productCategory:string = '';

  constructor(){
  }
}
