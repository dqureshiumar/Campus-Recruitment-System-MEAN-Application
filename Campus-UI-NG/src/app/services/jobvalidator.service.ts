import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobvalidatorService {

  constructor() { }

  validateJob(job){
    if(job.company_name == undefined 
      || job.apply_by == undefined
      || job.job_type == undefined
      || job.college_reg == undefined  
      || job.position == undefined 
      || job.skills == undefined
      || job.company_reg == undefined
      || job.company_website == undefined
      || job.salary == undefined
      || job.description == undefined
      ){
      return false;
    }
    else{
      return true;
    }
  }
}
