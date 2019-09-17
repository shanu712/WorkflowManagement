 import { Injectable } from '@angular/core';
 import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { AuthService } from '../service/authentication-service/authentication-service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

export class TokenInterceptor implements HttpInterceptor{
    currentUserValue :any;
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
       
        let token = localStorage.getItem('token')  ;
       let user = localStorage.getItem('user') 
        if (token!=null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}


