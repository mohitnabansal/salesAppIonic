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
    private customer:CustomerInfoInterface;
constructor(
  public newForm:FormGroup,
  public formBuild:FormBuilder,
  public imageStore:ImageStoreI
){

}
getNewForm(cust:CustomerInfoInterface):FormGroup{
  const phoneNo = cust.customerPhone;
  const dateOfBirth = cust.dob == null ? "" : cust.dob.split( "T" )[0];

  this.newForm = this.formBuild.group( {
    address: [cust.address, Validators.compose( [Validators.maxLength( 45 ), Validators.required] )],
    age: [cust.age, Validators.compose( [Validators.maxLength( 3 )] )],
    customerImg: this.imageStore.getNewForm(cust.customerImg),
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
