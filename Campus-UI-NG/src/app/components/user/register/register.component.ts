import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name : String;
  username :String;
  email :String;
  linkedin: String;
  github: String;
  portfolio: String;
  codechef: String;
  codeforces: String;
  hackerrank: String;
  password :String;
  constructor(
    private flashMessage : FlashMessagesService,
    private authService : AuthService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      linkedin: this.linkedin,
      github: this.github,
      portfolio: this.portfolio,
      codechef: this.codechef,
      codeforces: this.codeforces,
      hackerrank: this.hackerrank
    }

    //Fields Validation
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill all the details", {cssClass : 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Invalid Email", {cssClass : 'alert-danger', timeout: 3000});
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("User Registered Sucessfully, Kindly Login", {cssClass : 'alert-success', timeout: 3000});
        this.router.navigate(['/user/login']);
      }
      else{
        this.flashMessage.show("Something Went Wrong, Try Again", {cssClass : 'alert-danger', timeout: 3000});
        console.log(data.success);
        this.router.navigate(['/user/register']);
      }
    });

  }

}
