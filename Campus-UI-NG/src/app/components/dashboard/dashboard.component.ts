import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allJobs;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users/placements-listings').subscribe(data =>{
      this.allJobs = data.placements
    })
  }
  goToCollegeURL(urll) {
    window.open(urll, "_blank");
    //window.location.href=urll;
  }
  goToCompanyURL(urll) {
    window.open(urll, "_blank");
    //window.location.href=urll;
  }

}
