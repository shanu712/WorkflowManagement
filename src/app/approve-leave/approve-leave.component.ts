import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveService } from '../service/approve-service/approve-service';


@Component({

  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements OnInit {
 
  
  public leaves: any[] = [];
  leavedetails:any;
  employeeId: string = "";
  constructor(private router: ActivatedRoute,private route: Router, private requestService: ApproveService) { }
  
  ngOnInit() {
    this.router.params.subscribe(i => {
      this.employeeId = i.id

    });
    this.getApproval();
    
    
  }
  getApproval() {
   
    this.leaves = [];
    this.requestService.getApproveLeaves(this.employeeId).subscribe(x => {
      this.leavedetails = x;
      console.log(this.leavedetails);
     
    });
  }

  putApproval(employeeLeaveID: any, status: any){
     debugger;
    let model: any;
    if(status == 'Approve'){
      model = [
        {
          "op":"replace",
          "path":"/status",
          "value":"2"
        }];
    }
    if(status == 'Reject'){
      model = [
        {
          "op":"replace",
          "path":"/status",
          "value":"1"
        }];
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
