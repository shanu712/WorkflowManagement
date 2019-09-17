import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataTableModule} from "angular-6-datatable";
import { ViewRequestComponent } from "./view-request/view-request.component";
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CreateLeaveComponent } from './create-leave/create-leave.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestService } from './service/data-service/request.service';
import { ApproveService } from './service/approve-service/approve-service';
import { CreateService } from './service/create-leave/create-leave';
import { LoginService } from './service/login-service/login-service';
import { TokenInterceptor } from './helper/login-auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ViewRequestComponent,
    LoginComponent,
    CreateLeaveComponent,
    ApproveLeaveComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    HttpClientModule
      
  ],
  providers:[RequestService,ApproveService,CreateService,LoginService
    ,
  {
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }

  
],
 
  bootstrap: [AppComponent],
  
})
export class AppModule { }
