import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


}