import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : String;
  password : String;
  constructor(
    private flashMessage : FlashMessagesService,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You are now logged in", {cssClass : 'alert-success', timeout: 3000});
        this.router.navigate(['/user/dashboard']);
      }
      else{
        this.flashMessage.show("Invalid Username or Password", {cssClass : 'alert-danger', timeout: 3000});
        this.router.navigate(['/user/login']);
      }
    });
  }

}
