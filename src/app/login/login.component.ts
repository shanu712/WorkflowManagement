 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginData } from '../Models/logindata';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login-service/login-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  employeeId:string="";
  loginData : LoginData[]=[];
  // navigateByUrl:navigateByUrl[];
  // constructor(private router: ActivatedRoute, private route: Router, private requestService: LoginService) { }
  constructor( private router: ActivatedRoute, private route: Router, private requestService: LoginService) { }
  ngOnInit() {
    
  }
  //Function called on Submit of Login Button
  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid);
    debugger;
    if (form.valid) {
      let login : any = new LoginData;
     
      login.EmpCode = this.loginData["EmpCode"];
      login.Password = this.loginData["Password"]
      this.requestService.postLoginForm(login).subscribe(
        (res:any) =>{
          localStorage.setItem('user',login.EmpCode);
          localStorage.setItem('token',res.token);
         this.route.navigate(['/view-request/', login.EmpCode]);
      },error=>{
        if(error.status == 400)
        {
          alert('Authentication Failed!!\n\n' + JSON.stringify('Incorrect Username or Password'))

        }
        console.log(error);
      });
  }
 

  }

   
}
