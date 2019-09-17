import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRequestComponent } from "./view-request/view-request.component";
import { LoginComponent } from './login/login.component';
import { CreateLeaveComponent } from './create-leave/create-leave.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';


const routes: Routes = [

  { path: '',component : LoginComponent},
  { path: 'create-leave/:id',component : CreateLeaveComponent},
  { path: 'approve-leave/:id',component : ApproveLeaveComponent},
  { path: 'view-request/:id',component : ViewRequestComponent},
  { path: '**', component : ViewRequestComponent},
  { path: 'create-leave/:id/view-request/:id',component : ViewRequestComponent},
  { path: 'approve-leave/:id/view-request/:id',component : ViewRequestComponent}
  
]   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
