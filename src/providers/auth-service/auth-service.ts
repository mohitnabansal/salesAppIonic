import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthServiceProvider {
  LOGIN_URL: string = environment.authUrl;
  SIGNUP_URL: string = environment.apiUrl;
  contentHeader: HttpHeaders;
  jwtHelper: JwtHelper = new JwtHelper();
  user: string;
  error: string;
  local: Storage;
  cachedRequests: Array<HttpRequest<any>> = [];
  constructor(private http: HttpClient, public storage: Storage) {
    /* storage.ready().then(() => {
     });*/
    this.local = storage;
    let token = localStorage.getItem('id_token');
    if (token) {
      this.user = this.jwtHelper.decodeToken(token).username;

    }
}
  public authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.local.get('id_token').then(tok => {
        let isValid = tokenNotExpired('id_token', tok);
        if (isValid) {
          resolve(true)
        } else {
          reject(false);
        }
      }).catch(err => {
        console.log(err)
        reject(false);
      })
    });
  }
  login(credentials: any) {
    console.log(credentials)
    let body = 'username=' + credentials.username
      + '&password=' + credentials.password
      + '&grant_type=password';

    return new Promise((resolve, reject) => {
      this.http.post(this.LOGIN_URL, body.toString())
        // .map(res => res)
        .subscribe(
          data => {
            this.authSuccess(data);
            resolve(data)
          },
          err => {
            this.error = err;
            reject(err)
          }
        );
    });
  }
  signup(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.SIGNUP_URL, JSON.stringify(credentials))
        .map(res => res)
        .subscribe(
          data => {
            this.authSuccess(data);
            resolve(data)
          },
          err => {
            this.error = err;
            reject(err)
          }
        );
    });
  }
  logout() {
    this.local.remove('id_token');
    this.user = null;
  }
  authSuccess(token: any) {
    console.log(token.access_token)
    this.error = null;
    this.local.set('id_token', token.access_token);
    this.local.set('id_refresh',token.refresh_token);
    localStorage.setItem('id_token', token.access_token)
    localStorage.setItem('id_refresh',token.refresh_token)
    this.local.get('id_token').then(dat => {
      console.log(dat)
    }).catch(re => {
      console.log(re)

    });
    this.user = this.jwtHelper.decodeToken(token.access_token).username;
  }

  public getToken(){
    return this.local.get('id_token');
  }
public isTokenExpried(){
  return this.local.get('id_token').then((token)=>{
     return this.jwtHelper.isTokenExpired(token);

  }).catch((err)=>{
    console.log(err);
    return false;

  });

}
/*
public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
public retryFailedRequests(): void {

  this.cachedRequests.forEach((req)=>{
    this.http.request(req);
  })
  this.cachedRequests= [];
    // retry the requests. this method can
    // be called after the token is refreshed
  }
*/
  public getRefreshedToken(): Observable<Object> {

    return Observable.fromPromise(this.local.get('id_refresh')).flatMap((refreshToken)=>
  {
    let body = 'grant_type=refresh_token'
    + '&refresh_token=' + refreshToken;
    return this.http.post(this.LOGIN_URL,body);
  })


    /*

    .then((refreshToken)=>{


    .subscribe((accesToken)=>{
        console.log(accesToken);
        this.local.set('id_token',accesToken);
      })
    }).catch((error)=>{
      console.log(error)
    });
  }));*/
}
}
export interface TokenI {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;


}
