import { Component, OnInit ,ChangeDetectorRef, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveService } from '../service/approve-service/approve-service';
import { CreateMail } from './create-mail-data';
import {ViewRequestComponent}  from 'src/app/view-request/view-request.component'
import { IfStmt, analyzeAndValidateNgModules } from '@angular/compiler';
@Component({

  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements OnInit {
 
  
  public leaves: any[] = [];
  leavedetails:any;
  employeeId: string = "";
  empDetails :any;
  
  employeeLeaveID: any;
  data: any;
  constructor(private router: ActivatedRoute,private route: Router, private requestService: ApproveService) { }
  
  ngOnInit() {
    this.router.params.subscribe(i => {
      this.employeeId = i.id

    });
    this.getApproval();
    this.getEmpInfo();
    
    
  }
  getApproval() {
   
    this.leaves = [];
    this.requestService.getApproveLeaves(this.employeeId).subscribe(x => {
      if(x)
      { this.leavedetails = x;
          console.log("getapproval called!!" + this.leaves)
           console.log( this.leavedetails)
           console.log("f")


        }
     
    },error =>{
      this.onLogout();
    });
  }

  getEmpInfo() {

    this.requestService.getLeaves(this.employeeId).subscribe(x => {
    this.empDetails = x;
    console.log(this.empDetails);
  });
}

  putApproval(employeeLeaveID: any, status: any){
     debugger;
    let model: any;
    let body :any;
    let selectedData:any;
   
  selectedData = this.leavedetails.filter((item) => (item.employeeLeaveID == employeeLeaveID)); 
 var result = selectedData.map(e=> e.emailId);
 var name = selectedData.map(e=> e.empName);
 this.data = result;

 
  
     if(status == 'Approve'){
      
      model = [
        {
          "op":"replace",
          "path":"/status",
          "value":"2"
        }];
     var date =   selectedData.map(e =>e.dateOfRequest);
     
     body = {
           "To":this.data,
           "Cc":this.empDetails.emailId,
           "Text":"Dear  "+name+'\n\n'+"This is the mail regarding your leave request which you raise to your manager on "+selectedData.map(e=> e.dateOfRequest)+'\n'+" your leave has been approved."+'\n\n'+"Following are the details of your leave"+'\n'+"LeaveType:"+selectedData.map(e => e.leaveType)+'\n'+"ToDate:"+selectedData.map(e=>e.toDate)+'\n'+"FromDate:"+selectedData.map(e=>e.fromDate)+'\n'+"Days:"+selectedData.map(e=>e.days)+"."+'\n\n'+"If you further have any associated problem, direct towards management. "+"\n\n"+"Regards:"+this.empDetails.employeeName+'\n\n'+"Manager"+'\n'+"Evalueserve.com pvt ltd",
           "Subject":"Leave approval"+selectedData.map(e =>e.dateOfRequest)+"Approved"

     };
    
  
        this.requestService.postActionleaves(body)
        .subscribe(res => {
         debugger;
         console.log(res);
         console.log("mail forwarded");
          alert('Action has been Taken Successfully!!\n\n' + JSON.stringify('Mail has been forwarded to you as well as to your subordinate'))
          this.getApproval();
        },error =>{
          console.log(error);
        });
    }

    //for reject action
    if(status == 'Reject'){
      
      model = [
        {
          "op":"replace",
          "path":"/status",
          "value":"1"
        }];

        body = {
          "To":this.data,
          "Cc":this.empDetails.emailId,
          "Text":"Dear  "+name+'\n\n'+"This Mail is to communicate you regarding the application of your leave. We understand that you might have an issue but due to too much of pending work, we cannot allow you to take leaves . You have already availed  leaves earlier , plz try to understand and apply leaves after deployment of project . If you further have any associated problem, direct towards management. "+"\n\n"+"Regards:"+this.empDetails.employeeName+'\n\n'+"Manager"+'\n'+"Evalueserve.com pvt ltd",
          "Subject":"Leave approval Requested on "+date +"Rejected"

    };
    this.requestService.postActionleaves(body)
    .subscribe(res => {
     debugger;
     console.log(res);
     console.log("mail forwarded");
      alert('Action has been Taken Successfully!!\n\n' + JSON.stringify('Mail has been forwarded to you as well as to your subordinate'))
      this.getApproval();
    },error =>{
      console.log(error);
    });
   
    }
    
    this.requestService.patchApproveLeaves(employeeLeaveID, model).subscribe(x => {
        this.leavedetails = x;
      console.log(this.leavedetails);
      this.getApproval();
    
    });

    
  }




  onLogout(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
}
