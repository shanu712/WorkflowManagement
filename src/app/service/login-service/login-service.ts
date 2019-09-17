import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from 'src/app/Models/logindata';

@Injectable()
export class LoginService
{
  
   
constructor(private httpclient:HttpClient)
{

}

 

postLoginForm(loginData: LoginData) : Observable<any>{
  
   const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    return this.httpclient.post<any>('https://localhost:44395/api/ApplicationUser/Login',loginData,httpOptions);
 }
}