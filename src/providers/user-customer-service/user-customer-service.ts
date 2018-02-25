import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../../environments/environment';

//Observable operators
import { catchError, map, tap, retry } from 'rxjs/operators';

/*
  Generated class for the UserCustomerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserCustomerServiceProvider  {


    private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(public http: HttpClient) {
    console.log('Hello UserCustomerServiceProvider Provider');
    console.log(environment.apiUrl);
  }


  saveCutomerUserInfo(userData:any){
     this.http.post(environment.apiUrl+'saveCustomer',userData,{headers: this.headers}).subscribe((data)=>{
         console.log(data);
     })

  }
  searchuser(phoneNo:string):Observable<any>{
      //phone = phoneNo.toString();
      // Add safe, URL encoded search parameter if there is a search term
      const options = phoneNo ?  { params: new HttpParams().set('phoneNo', phoneNo) } : {};
      return this.http.get(environment.apiUrl+'checkIfCustomerExistByPhone', options) .pipe(
              retry(3), // retry a failed request up to 3 times,
              catchError(this.handleError),
              tap( // Log the result or error
                      data => console.log(data),
                      error => console.log(error)
              )
      );

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
