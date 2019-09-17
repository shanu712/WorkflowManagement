import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateLeaveData } from 'src/app/create-leave/create-leave-data';

@Injectable()
export class CreateService
{
    
    constructor(private httpclient:HttpClient)
    {

    }


    postClientSettingForm(id:string,createLeave: CreateLeaveData) : Observable<any>{
        return this.httpclient.post('https://localhost:44395/api/createleave/'+id, createLeave);
        
        }
        
        getLeaveTypesAPI():Observable<any[]>{
            
            let api: string ='https://localhost:44395/api/balance/';
            return this.httpclient.get<any[]>(api);
    
        }

}