import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../service/data-service/request.service';
import { LeaveData } from '../Models/leavedata';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']

})
export class ViewRequestComponent implements OnInit {
  public leaves: any[] = [];
   employeeId: string = "";
  empDetails: any;
// Importing Leave types Model
  leaveData : LeaveData[] ;

  constructor(private router: ActivatedRoute, private route: Router, private requestService: RequestService) {
 }
 ngOnInit() {
  
    this.router.params.subscribe(i => {
       this.employeeId = i.id
       });
         
          this.getEmpInfo();
          this.getleaveInfo();
          this.getLeaveTypes();
    
  }
  //Get Employee Detail Api Calling Method
  getEmpInfo() {

      this.requestService.getLeaves(this.employeeId).subscribe(x => {
      this.empDetails = x;
    });
  }

  //Get Leave Types API calling Method
  getLeaveTypes(){
    
    this.requestService.getLeaveTypesAPI(this.employeeId).subscribe(x => {
           
    this.leaveData = x;
   
  });
  
  }

  //Manage Leave Api Calling Method
  
  getleaveInfo() {
      this.leaves = [];
      this.requestService.getleaveInfo(this.employeeId).subscribe(x => {
       if (x)
      this.leaves=x;
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
}
