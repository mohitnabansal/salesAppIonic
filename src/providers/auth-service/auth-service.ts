import { HttpClient , HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
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
    local:Storage;
    constructor(private http: HttpClient,public storage:Storage) {
     /* storage.ready().then(() => {
      });*/
      this.local = storage;
        let token = localStorage.getItem('access_token');
        if (token) {
            this.user = this.jwtHelper.decodeToken(token).username;
        }


        let headers = new HttpHeaders();
        this.contentHeader = headers.append("Authorization", "Basic " + btoa("devglan-client:devglan-secret"))
                                    .append("Content-Type", "application/x-www-form-urlencoded");


      }
  public authenticated() {
    return new Promise((resolve, reject) => {

    this.local.get('id_token').then(tok => {
     let isValid = tokenNotExpired('id_token', tok);
     if(isValid){
       resolve(true)
     }else{
       reject(false);
     }
    }).catch(err => {
      console.log(err)
      reject(false);
    })
  });
 }
    login(credentials:any) {
      console.log(credentials)
      let body = 'username='+credentials.username
                            +'&password='+credentials.password
                            +'&grant_type=password';

        return new Promise((resolve, reject) => {
            this.http.post(this.LOGIN_URL, body.toString(), { headers: this.contentHeader })
               // .map(res => res)
                .subscribe(
                    data => {
                      console.log(data)
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
            this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
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
    authSuccess(token:any) {
      console.log(token.access_token)
        this.error = null;
        this.local.set('id_token', token.access_token);
this.local.get('id_token').then(dat=>{
  console.log(dat)
}).catch(re=>{
console.log(re)

});
        this.user = this.jwtHelper.decodeToken(token.access_token).username;
    }
}

export interface TokenI{
  access_token:string;
  token_type:string;
  refresh_token:string;
  expires_in:number;
  scope:string;
  jti:string;


}
