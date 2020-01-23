import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private service:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //add authorization header with jwt token if available
    let currentUser = this.service.currentUserValue;
    if(currentUser && currentUser.jwtToken){
      console.log("Add Token");
      //console.log(currentUser.jwtToken);
      req = req.clone({
        setHeaders: {
          Authorization : `Bearer ${currentUser.jwtToken}`
        }
      });
    } 
    return next.handle(req);
  }
  
}
