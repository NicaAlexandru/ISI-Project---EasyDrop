import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../models/appUser";
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './app.signupForm.html',
  styleUrls: ['./app.signupForm.css']
})
export class AppSignupForm {

  public appUser!: AppUser;

  constructor(private appUserService: AppUserService, private router: Router) { }

  onSubmit(userItem: AppUser) {
    this.appUser = new AppUser(userItem.userName, userItem.userPassword,
                              userItem.email, userItem.userType, userItem.phoneNumber)

    /* Check that the user is new */
    this.appUserService.getAppUserByUserName(userItem.userName).subscribe(
      (response: AppUser) => {
        alert("Username already taken!");
      },
      (error: HttpErrorResponse) => {
        this.appUserService.getAppUserByEmail(userItem.userName).subscribe(
          (response: AppUser) => {
            alert("Email already taken!");
          },
          (error: HttpErrorResponse) => {
            this.appUserService.addAppUsers(this.appUser).subscribe(
              (response: AppUser) => {
                console.log("Succesfully added user");

                if (this.appUser.userType == "CLIENT") {
                  this.router.navigate(['/client-basemap']);
                } else if (this.appUser.userType == "SELLER") {
                  this.router.navigate(['/seller-basemap'])
                } else if (this.appUser.userType == "COURIER") {
                  this.router.navigate(['/courier-basemap'])
                }
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
          }
        );
      }
    );
  }
}
