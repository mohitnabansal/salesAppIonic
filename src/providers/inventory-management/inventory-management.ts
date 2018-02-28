import { HttpClient,HttpParams,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../../environments/environment';
//Observable operators
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Inventory } from '../../interface/inventory-interface';

/*
  Generated class for the InventoryManagementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryManagementProvider {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient) {
    console.log('Hello InventoryManagementProvider Provider');
    console.log(environment.apiUrl);
  }

  searchProductByBarcode(barCode:string,type:string):Observable<any>{
    const options = barCode ?  { params: new HttpParams().set('barCode', barCode) ,headers:this.headers } : {};

return  this.http.get(environment.apiUrl+'getProductInfoByBarCode',options).pipe(
  retry(1), // retry a failed request up to 3 times,
  catchError(this.handleError),
  tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
  )
);
  }

 searchProductByName(productName:string,type:string):Observable<any>{
    const options = productName ?  { params: new HttpParams().set('productName', productName) ,headers:this.headers } : {};

return  this.http.get(environment.apiUrl+'getProductInfoByProductName',options).pipe(
  retry(1), // retry a failed request up to 3 times,
  catchError(this.handleError),
  tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
  )
);
  }


  createOrUpdateInventory(inventory:Inventory):Observable<any>{
    console.log(inventory)
    return this.http.post(environment.apiUrl+'saveInventory',inventory,{headers:this.headers});
  }

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an ErrorObservable with a user-facing error message
  return new ErrorObservable(
    'Something bad happened; please try again later.');
};

}
