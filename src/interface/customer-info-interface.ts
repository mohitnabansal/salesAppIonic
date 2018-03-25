import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageStore, ImageStoreI } from './image-store-interface';
export interface CustomerInfoInterface{

    address : string ;
    age : number;
    customerImg : ImageStore ;
    customerPhone : number ;
    dob : string;
    emailId : string;
    gender : string ;
    id : string ;
    name : string ;
    pincode : string ;


}

export class CustomerInfo implements CustomerInfoInterface{
    address : string = "";
    age : number  = null;
    customerImg : ImageStore ;
    customerPhone : number = null;
      dob : string = "";
    emailId : string = "";
    gender : string= "" ;
    id : string ="";
  name : string = "";
    pincode : string= "";
    public imageStore:ImageStoreI
constructor(
  public newForm:FormGroup,
  public formBuild:FormBuilder
){
this.imageStore = new ImageStoreI(newForm,formBuild);
}
 getNewForm(cust:CustomerInfoInterface):FormGroup{
  const phoneNo = cust.customerPhone;
  const dateOfBirth = cust.dob == null ? "" : cust.dob.split( "T" )[0];
  let custImage  =  cust.customerImg == null ? this.imageStore :cust.customerImg;
  this.newForm = this.formBuild.group( {
    address: [cust.address, Validators.compose( [Validators.maxLength( 45 ), Validators.required] )],
    age: [cust.age, Validators.compose( [Validators.maxLength( 3 )] )],
    customerImg: this.imageStore.getNewForm(custImage),
    dob: [dateOfBirth],
    emailId: [cust.emailId],
    gender: [cust.gender],
    name: [cust.name],
    customerPhone: [phoneNo],
    id: [cust.id],
    pincode: [cust.pincode]

} );
  return this.newForm;
}

}
