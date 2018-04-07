import { environment } from './../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider, TokenI } from './../providers/auth-service/auth-service';
import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { concatMap, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public  contentHeader;
  private auth:AuthServiceProvider;
  private http:HttpClient;
  LOGIN_URL: string = environment.authUrl;
  constructor(public inj: Injector) {


  }
 // constructor(public auth: AuthServiceProvider) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.auth = this.inj.get(AuthServiceProvider);
    this.http = this.inj.get(HttpClient);

    if(request.headers.get('Authorization').includes('Basic') && request.headers.has('Content-Type')){
      return next.handle(request);
    }else{
      return Observable.fromPromise(this.auth.isTokenExpried()).flatMap((res)=>{
        if(res==true){

          return this.auth.getRefreshedToken().flatMap((response:TokenI)=>
        {
              console.log(response);
              this.auth.authSuccess(response);
              let newRequest = request.clone({setHeaders: {
                Authorization: 'Bearer '+ response.access_token
              }})
              return next.handle(newRequest);
        })


        }else{
          return next.handle(request);
        }
      })
    }



    /*.do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.auth.retryFailedRequests();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.collectFailedRequest(request.clone());
          return this.auth.getRefreshedToken().flatMap((event)=>{
            console.log(event);
            return   next.handle(request)
 //Observable.throw(event)

          }).subscribe((e)=>{console.log(e)},(r)=>{console.log(r)});


        }
      }
    }).flatMap((event: HttpEvent<any>)=>{
      debugger;
      if (event instanceof HttpResponse) {
                // do stuff with response if you want
        this.auth.retryFailedRequests();
        console.log(event)
        return next.handle(request);
      };

      if (event instanceof HttpErrorResponse) {
        if (event.status === 401) {
          this.auth.collectFailedRequest(request.clone());
          console.log(event)
          return Observable.fromPromise(this.auth.getRefreshedToken())


        }
      }

      })//.pipe(switchMap((e)=>{ return Observable.throw(e)}));



    /*.do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.auth.retryFailedRequests();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.collectFailedRequest(request.clone());
          return this.auth.getRefreshedToken().HTTP_INTERCEPTORS;


        }
      }
    });*/
  }


}
