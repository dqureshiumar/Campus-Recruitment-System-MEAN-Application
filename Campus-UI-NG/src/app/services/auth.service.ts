import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user : any;
  job : any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  registerUser(user){
    let headers = new HttpHeaders();
    //console.log(user);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res : any) => res));
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe(map((res : any) => res));
  }
  getProfile(){
    // let headers = new HttpHeaders();
    this.loadToken();
    let headers = new HttpHeaders({'Authorization': this.authToken, 'Content-Type': 'application/json'});
    return this.http.get('http://localhost:3000/users/profile',{headers:headers});
  }
  
  addJob(job){
    let headers = new HttpHeaders().set(
      "Authorization",localStorage.getItem('id_token')
    );
    //const authToken = localStorage.getItem('id_token');
    //console.log(authToken);
    headers.append('Content-Type','application/json');
    //headers.append('Authorization',authToken); 
    return this.http.post('http://localhost:3000/users/placements', job, {headers: headers}).pipe(map((res : any) => res));
  }

  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }
  
  loggedIn(){
    this.authToken = this.loadToken();
    return this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
