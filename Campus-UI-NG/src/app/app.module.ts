import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/user/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ListingComponent } from './components/company/listing/listing.component';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { AuthGuard } from './guards/auth.guard';
import { AddJobComponent } from './components/user/add-job/add-job.component';
import { JobListingsComponent } from './components/user/job-listings/job-listings.component'
 
const appRoutes:  Routes = [
  { path:'', component: HomeComponent },
  { path:'user/register', component: RegisterComponent },
  { path:'user/login', component: LoginComponent },
  { path:'user/dashboard', component: DashboardComponent},
  { path:'user/profile', component: ProfileComponent},
  { path:'company/listing', component: ListingComponent},
  { path:'user/placements', component: AddJobComponent}
];

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListingComponent,
    AddJobComponent,
    JobListingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200","localhost:3000"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [
    HttpClientModule,
    AuthGuard,
    AuthService,
    ValidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
