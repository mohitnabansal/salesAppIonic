import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Injectable, NgModule, Injector} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  public  contentHeader;
  private auth:AuthServiceProvider;
  constructor(public inj: Injector) {}
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let headers = new HttpHeaders();
  this.contentHeader = headers.append("Authorization", "Basic " + btoa("devglan-client:devglan-secret"))
  .append("Content-Type", "application/x-www-form-urlencoded");
  this.auth = this.inj.get(AuthServiceProvider);
  let dupReq= req.clone();
 return Observable.fromPromise(this.auth.getToken())
 .flatMap((token)=>{
   if(req.serializeBody()!= null && req.serializeBody().toString().valueOf().includes('grant_type=password')){
   dupReq = req.clone({headers: this.contentHeader});
}
else if(req.serializeBody() != null &&  req.serializeBody().toString().valueOf().includes('grant_type=refresh_token')){
 dupReq = req.clone({headers:this.contentHeader});
}else if(token != null){
  dupReq = req.clone({setHeaders: {
   Authorization: 'Bearer '+ token
 }});
 }
return next.handle(dupReq);
 })};

};
