import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../models/appUser";
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-signup',
  templateUrl: './app.signupForm.html',
  styleUrls: ['./app.signupForm.css']
})
export class AppSignupForm {

  public appUser!: AppUser;

  constructor(private appUserService: AppUserService, private router: Router,
              private dataService: DataService) { }

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

                this.dataService.setAppUser(response);
                if (this.appUser.userType == "CLIENT") {
                  this.dataService.setLoggedClient(response);
                  this.router.navigate(['/client-basemap']);
                } else if (this.appUser.userType == "SELLER") {
                  this.dataService.setLoggedSeller(response);
                  this.router.navigate(['/seller-basemap'])
                } else if (this.appUser.userType == "COURIER") {
                  this.dataService.setLoggedCourier(response);
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
