import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object
  constructor(
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void {

    this.authService.getProfile().subscribe(profile => {
      // console.log(profile['profile']['name']);
      // console.log(profile);
      this.user = profile['profile'];
    },
    err =>{
      console.log(err);
      return false;
    });
  }

}
