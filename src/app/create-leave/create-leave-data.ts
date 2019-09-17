 export interface CreateLeaveData{
      emplid : string;
      fromDate : Date;
     toDate: Date;
     Days : Int16Array;
     leaveTypeId : Int16Array;
     reasons : string;
 }