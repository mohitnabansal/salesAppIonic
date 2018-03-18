import { ProductInfo } from './inventory-interface';
import { FormGroup, FormBuilder } from '@angular/forms';
export interface  ImageStore{
  id : string;
  image64 :string;
  imageDescp : string;
  imgMetaData : string;
}


export class ImageStoreI implements ImageStore{
  id : string = '';
  image64 :string = '';
  imageDescp : string = '';
  imgMetaData : string = '';

  constructor( public newForm:FormGroup,
    public formBuild:FormBuilder){
  }
  getNewForm(data:ImageStore):FormGroup{
    let img = "";
    try{
      if(typeof data.id == 'undefined'){
        data = new ImageStoreI(null,null);

    }else{
     img = data.image64 == null ? "" : data.image64;
    }
    }catch(err){
      console.log("Data Not Found for The Scanned Image")
    }
    this.newForm=this.formBuild.group({
      id : [data.id],
      image64 :[img],
      imageDescp : [data.imageDescp],
      imgMetaData : [data.imgMetaData],
    });
    return this.newForm;
  }

}
