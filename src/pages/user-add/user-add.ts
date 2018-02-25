import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraProvider } from './../../providers/camera/camera';
import { UserCustomerServiceProvider } from './../../providers/user-customer-service/user-customer-service';
import { CustomerInfoInterface } from './../../interface/customer-info-interface';
/**
 * Generated class for the UserAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component( {
    selector: 'page-user-add',
    templateUrl: 'user-add.html',
} )
export class UserAddPage implements AfterViewInit {

    private cust: CustomerInfoInterface ;
    private customerInfo: FormGroup;
    @ViewChild( 'cameraImg' ) cameraImg: ElementRef;
    private imageString:string;

    constructor( public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public actionsheetCtrl: ActionSheetController,
        public platform: Platform
        , private camera: Camera,
        private cameraService: CameraProvider,
        private customerSerive: UserCustomerServiceProvider ) {

        this.cust = this.navParams.get( 'cust' ) != null ? this.navParams.get( 'cust' ) : {};
        const phoneNo = this.cust.customerPhone;
        const dateOfBirth = this.cust.dob == null ? "" : this.cust.dob.split( "T" )[0];
        const img = this.cust.customerImg == null ? "" : "data:image/png;base64," + this.cust.customerImg;
        this.imageString = img;
        this.customerInfo = this.formBuilder.group( {
            address: [this.cust.address, Validators.compose( [Validators.maxLength( 45 ), Validators.required] )],
            age: [this.cust.age, Validators.compose( [Validators.maxLength( 3 )] )],
            customerImg: [this.cust.customerImg],
            dob: [dateOfBirth],
            emailId: [this.cust.emailId],
            gender: [this.cust.gender],
            name: [this.cust.name],
            customerPhone: [phoneNo],
            id: [this.cust.id],
            pincode: [this.cust.pincode]

        } );
        console.log( this.customerInfo );
    }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad UserAddPage' );
        this.cameraImg.nativeElement.src =  this.imageString;
    }
    ngAfterViewInit() {
        this.cameraImg.nativeElement.src =  this.imageString;
    }
    logForm() {
        console.log( this.customerInfo.value )
        this.customerSerive.saveCutomerUserInfo( this.customerInfo.value );
    }
    openMenu() {
        let actionSheet = this.actionsheetCtrl.create( {
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Take Picture',
                    icon: !this.platform.is( 'ios' ) ? 'trash' : null,
                    handler: () => {
                        this.cameraService.takePicture( this.camera )
                            .then( data => {
                                this.customerInfo.value['customerImg'] = data;
                                this.cameraImg.nativeElement.src = "data:image/png;base64," + data;
                            } )
                            .catch( err => console.log( err ) )
                    }
                },
                {
                    text: 'Select from gallery',
                    icon: !this.platform.is( 'ios' ) ? 'share' : null,
                    handler: () => {
                        console.log( 'Share clicked' );
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is( 'ios' ) ? 'close' : null,
                    handler: () => {
                        console.log( 'Cancel clicked' );
                    }
                }
            ]
        } );
        actionSheet.present();
    }

}
