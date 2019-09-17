import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// this is service for view request which provide api url for fetching data from database
// it comes to this service after componenet files calls it.
@Injectable()
export class RequestService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getLeaves(id:string)
    {  
        // getting employee details as per employeeId from database 
        let api: string ='https://localhost:44395/api/employee/'+id;
        return this.httpclient.get(api);
    }

    getleaveInfo(id:string):Observable<any[]>{
        // fetching leave records from the database with employee id as params
        let api: string ='https://localhost:44395/api/createleave/'+id;
      return  this.httpclient.get<any[]>(api);
    }

    getLeaveTypesAPI(id:string):Observable<any[]>{
            
        let api: string ='https://localhost:44395/api/balance/'+id;
        return this.httpclient.get<any[]>(api);

    }
    
}