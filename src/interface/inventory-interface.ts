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
    currProdPrice : number;
    id : string
    prodDiscPrice : number;
    prodImg : ImageStore;
    productDescp : string;
    productName : string;
    productVerion : number
    lastUpdatedOn:Date;
    productCategory:string;
    productQuantity:number;
    version:number;
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
    this.imageStore = new ImageStoreI(this.newForm,this.formBuild);
    //this.versionHistory = new Array<ProductInfoClass>();

  }

  ngOnInit(){

  }
 getNewForm(data:Inventory):FormGroup{
  this.newForm=this.formBuild.group({
    id:[data.id != null ? data.id:null],
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
     prodInfo = new ProductInfoClass();
     console.log("Data Related to the Scanned Product Not Found");
  }
  return this.formBuild.group({
    barcodeFormat : [prodInfo.barcodeFormat],
    barCodeNumber : [prodInfo.barCodeNumber],
    currProdPrice : [prodInfo.currProdPrice,Validators.compose( [Validators.maxLength(5), Validators.pattern('^[0-9]+(\.[0-9]*){0,1}$'),Validators.required] )],
    id : [prodInfo.id],
    prodDiscPrice : [prodInfo.prodDiscPrice,Validators.compose( [Validators.maxLength(5), Validators.pattern('^[0-9]+(\.[0-9]*){0,1}$'),Validators.required] )],
    prodImg : this.imageStore.getNewForm(prodInfo.prodImg),
    productDescp : [prodInfo.productDescp,Validators.compose( [Validators.maxLength(50),Validators.required] )],
    productName : [prodInfo.productName,Validators.compose( [Validators.maxLength(20),Validators.required] )],
    productVerion : [prodInfo.productVerion,Validators.compose( [Validators.maxLength(20),Validators.required, Validators.pattern('^[0-9]{1,10}$'),] )],
    lastUpdatedOn:[prodInfo.lastUpdatedOn],
    productCategory:[prodInfo.productCategory,Validators.compose([Validators.required] )],
    productQuantity:[prodInfo.productQuantity,Validators.compose( [Validators.maxLength(20),Validators.required] )],
    version:[prodInfo.version]
  })
}
}


export class ProductInfoClass implements ProductInfo{

    barcodeFormat : string = '';
    barCodeNumber : number  = null;
    currProdPrice : number = null;
    id : string = null;
    prodDiscPrice : number = null;
    prodImg : ImageStore = new ImageStoreI(null,null);
    productDescp : string = '';
    productName : string = '';
    productVerion : number = null;
    lastUpdatedOn:Date = null;
    productCategory:string = '';
    productQuantity:number=null;
    version:number=null;
  constructor(){
  }
}
