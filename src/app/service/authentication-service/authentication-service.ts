import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/Models/logindata';
//  import decode from 'jwt-decode';
@Injectable()
export class AuthService {
    router: any;
   
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if(localStorage.getItem('token') != null)
    return true;
    else
    this.router.navgate(['/login'])
    // localStorage.setItem('currentUser', JSON.stringify(LoginData));
    
    //return tokenNotExpired(null, token);
  }
}