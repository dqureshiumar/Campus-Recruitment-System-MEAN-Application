import { Component, OnInit } from '@angular/core';
import { JobvalidatorService } from '../../../services/jobvalidator.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  company_name : String;
  job_type :String;
  apply_by :String;
  position: String;
  company_website: String;
  salary: String;
  skills: String;
  company_reg: String;
  college_reg: String;
  description: String;
  constructor(
    private jobValidator : JobvalidatorService,
    private flashMessage : FlashMessagesService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  onJobSubmit(){
    const job = {
      company_name : this.company_name,
      job_type :this.job_type,
      apply_by :this.apply_by,
      position:this.position,
      company_website :this.company_website,
      salary : this.salary,
      skills : this.skills,
      company_reg : this.company_reg,
      college_reg : this.college_reg,
      description : this.description
    }

    //Fields Validation
    if(!this.jobValidator.validateJob(job)){
      this.flashMessage.show("Please fill all the details", {cssClass : 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.addJob(job).subscribe(data => {
      if(data.success){
        this.flashMessage.show("Job Added Successfully", {cssClass : 'alert-success', timeout: 3000});
        this.router.navigate(['user/dashboard']);
      }
      else{
        this.flashMessage.show("Something Went Wrong, Try Again", {cssClass : 'alert-danger', timeout: 3000});
        console.log(data.success);
        this.router.navigate(['user/placements']);
      }
    });
  }
}
