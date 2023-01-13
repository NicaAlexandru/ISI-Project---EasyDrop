import {Component, OnInit} from '@angular/core';
import { AppUser } from '../../models/appUser'
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './app.loginForm.html',
  styleUrls: ['./app.loginForm.css']
})
export class AppLoginForm {
  title = 'EasyDrop';

  public appUser!: AppUser;

  constructor(private appUserService: AppUserService, private router: Router,
              private dataService: DataService) { }

  onSubmit(userItem: AppUser) {
    this.appUserService.getAppUserByUserName(userItem.userName).subscribe(
      (response: AppUser) => {
        this.appUser = response;
        console.log(this.appUser);
        this.checkCredentials(this.appUser, userItem.userPassword);
      },
      (error: HttpErrorResponse) => {
        this.appUserService.getAppUserByEmail(userItem.userName).subscribe(
          (response: AppUser) => {
            this.appUser = response;
            console.log(this.appUser);
            this.checkCredentials(this.appUser, userItem.userPassword);
          },
          (error: HttpErrorResponse) => {
            alert("User not found!");
          }
        );
      }
    );
  }

  checkCredentials(foundUser: AppUser, submittedPassword: string) {
    if (foundUser.userPassword != submittedPassword) {
      alert("Invalid credentials")
    } else {
      this.dataService.setAppUser(foundUser);
      if (this.appUser.userType == "CLIENT") {
        this.dataService.setLoggedClient(foundUser);
        this.router.navigate(['/client-basemap']);
      } else if (this.appUser.userType == "SELLER") {
        this.dataService.setLoggedSeller(foundUser);
        this.router.navigate(['/seller-basemap'])
      } else if (this.appUser.userType == "COURIER") {
        this.dataService.setLoggedCourier(foundUser);
        this.router.navigate(['/courier-basemap'])
      }
    }
  }
}
