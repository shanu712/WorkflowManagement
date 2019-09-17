import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateLeaveData } from './create-leave-data';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateService } from '../service/create-leave/create-leave';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LeaveData } from '../Models/leavedata';




@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.css']
})
export class CreateLeaveComponent implements OnInit {
  postError: boolean;
  postErrorMessage: string;
  [x: string]: any;
  employeeId: string = "";
  returnUrl: string;

  createLeave: CreateLeaveData[] = [];
  
  countDays:number=0;
  countLeaves:number=0;

  //Dropdown list of Leave Type Model
  leaveData : LeaveData[] ;
  constructor(private router: ActivatedRoute, private route: Router, private requestService: CreateService) { }


  ngOnInit() {
    this.createLeave["leaveTypeId"] = "";
    this.router.params.subscribe(i => {
      this.employeeId = i.id
    });
    //calling dropdownlist method on init
    this.getLeaveTypes();
  }

  getLeaveTypes(){
    
      this.requestService.getLeaveTypesAPI().subscribe(x => {
             
      this.leaveData = x;
     
    });
    
    }

  onSubmit(form: NgForm) {
    
    console.log('in onSubmit: ', form.valid);
    if (form.valid) {
      // debugger;
      if(new Date(this.createLeave["fromDate"])> new Date(this.createLeave["toDate"]))
      {
        this.postError = true;
        this.postErrorMessage = "From date should not be greater than to date";
        return;
      }
       else{
         this.postError = false;
        this.postErrorMessage = '';
       }

      this.requestService.postClientSettingForm(this.employeeId,form.form.value).subscribe(res=>{
        this.route.navigate(['view-request', this.employeeId]);
      },error=>{
        console.log(error);
      });
   

    }
    else {
      this.postError = true;
       this.postErrorMessage = "Please fix the error";
    }
  }

 
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
   

  }

    cal(){
      
    
      var toDate = this.createLeave["toDate"] != null && this.createLeave["toDate"] != undefined 
                     ? new Date(this.createLeave["toDate"]) : undefined;
      var fromDate = this.createLeave["fromDate"] != null && this.createLeave["fromDate"] != undefined 
                     ? new Date(this.createLeave["fromDate"]) : undefined;
     if(toDate != undefined && fromDate != undefined){
     this.countDays = Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()) - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) ) /(1000 * 60 * 60 * 24));
     this.countLeaves =  this.countDays + 1 ;
    
    }  
   }
   onLogout(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }

  onCancel(form: NgForm){
    //form.reset();
    window.location.reload();
  }


}