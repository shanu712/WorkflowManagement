import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateMail} from 'src/app/approve-leave/create-mail-data'


@Injectable()
export class ApproveService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getApproveLeaves(id:string)
    {
        let api: string ='https://localhost:44395/api/Approval/'+id;
        return this.httpclient.get(api);
    }

    patchApproveLeaves(id:string, model: any)
    {
        let api: string ='https://localhost:44395/api/createleave/'+id;
        return this.httpclient.patch(api,model);
    }


    postActionleaves(body:any) : Observable<any>
    {     let api: string = 'https://localhost:44395/api/ValuesController1/';
        return this.httpclient.post<any>(api,body);
    }

    getLeaves(id:string)
    {  
        // getting employee details as per employeeId from database 
        let api: string ='https://localhost:44395/api/employee/'+id;
        return this.httpclient.get(api);
    }

}