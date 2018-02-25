import {  OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    prodImgPath : string;
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

  constructor(
    public newForm:FormGroup,
  public formBuild:FormBuilder ){

    this.prodInfo =  new ProductInfoClass();
    this.versionHistory = new Array<ProductInfoClass>();

  }

  ngOnInit(){

  }
 getNewForm(data:Inventory):FormGroup{
  this.newForm=this.formBuild.group({
    id:['',],
    version:[''],
    prodInfo : this.createItem(),
    versionHistory :this.formBuild.array([this.createItem()])

  });
  return this.newForm;
}
createItem(): FormGroup {
  return this.formBuild.group({
    barcodeFormat : [''],
    barCodeNumber : [''],
    CurrProdPrice : [''],
    id : [''],
    prodDiscPrice : [''],
    prodImgPath : [''],
    productDescp : [''],
    productName : [''],
    productVerion : [''],
    lastUpdatedOn:[''],
    productCategory:['']
  })
}
}


export class ProductInfoClass implements ProductInfo{

    barcodeFormat : string;
    barCodeNumber : number;
    CurrProdPrice : number;
    id : string
    prodDiscPrice : number;
    prodImgPath : string;
    productDescp : string;
    productName : string;
    productVerion : number
    lastUpdatedOn:Date;
    productCategory:string;

  constructor(){
  }
}
