import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../models/appUser";
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './app.signupForm.html',
  styleUrls: ['./app.signupForm.css']
})
export class AppSignupForm {

  public appUser!: AppUser;

  constructor(private appUserService: AppUserService) { }

  onSubmit(formAppUser: AppUser) {
    this.appUser = new AppUser(formAppUser.userName, formAppUser.userPassword,
                              formAppUser.email, formAppUser.userType, formAppUser.phoneNumber)

    console.log(this.appUser)
    this.appUserService.addAppUsers(this.appUser).subscribe(
      (response: AppUser) => {
        alert("Succesfully added user");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
