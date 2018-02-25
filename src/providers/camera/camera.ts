import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
private cam:Camera;
private image:any;
  constructor(public http: HttpClient) {
    console.log('Hello CameraProvider Provider');
  }
  takePicture(camera:Camera){
      let options = {
              quality: 100,
              destinationType: camera.DestinationType.DATA_URL,
            //  destinationType: camera.DestinationType.FILE_URI,
              sourceType: camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              saveToPhotoAlbum: false,
              correctOrientation: true
          };
      return new Promise((resolve,reject)=>{
          camera.getPicture(options).then((imagePath)=>{
              this.image = imagePath;
              resolve(imagePath);
          }).catch(err=>reject(err));          
      })
      
     /* $cordovaCamera.cleanup().then(...); // only for FILE_URI

  }, false); */
  }
  
  scanBarcode(barCode:BarcodeScanner){
      return new Promise((res,rej)=>{
      barCode.scan().then((barcodeData) => {
          // Success! Barcode data is here
          res(barcodeData);
         }, (err) => {
             rej(err);
         });
       })
  }
}
