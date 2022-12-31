import {Component, OnInit} from '@angular/core';
import { AppUser } from '../../models/appUser'
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './app.loginForm.html',
  styleUrls: ['./app.loginForm.css']
})
export class AppLoginForm {
  title = 'EasyDrop';

  public appUser!: AppUser;

  constructor(private appUserService: AppUserService, private router: Router) { }

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
      this.router.navigate(['/basemap']);
    }
  }
}
