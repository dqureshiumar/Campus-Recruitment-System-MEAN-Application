import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    private flashMessage : FlashMessagesService,
    public authService : AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show("User Logged Out", {cssClass:'alert-success', timeout:3000} );
    this.router.navigate(['/user/login']);
    return false;
  }
  getItem () { 
    if(!this.authService.loggedIn()){
      const user = localStorage.getItem('user');
      const u = JSON.parse(user);
      if(u.role == 'admin'){
        
        return true;
      }
    }
    else{
      return false;
    }
  }

}