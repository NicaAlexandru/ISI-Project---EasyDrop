import {Component} from "@angular/core";
import {AppUser} from "../../models/appUser";
import {HttpErrorResponse} from "@angular/common/http";
import {AppUserService} from "../../services/appUser.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-forgotUsername',
  templateUrl: './app.forgotUsername.html',
  styleUrls: ['./app.forgotUsername.css']
})
export class AppForgotUsername {
  private appUser!: AppUser;

  constructor(private appUserService: AppUserService, private dataService: DataService, private router: Router) { }

  onSubmit(userItem: AppUser) {
    console.log(userItem)
    this.appUserService.getAppUserByEmail(userItem.email).subscribe(
      (response: AppUser) => {
        this.appUser = response;
        this.dataService.appUser = this.appUser
        this.router.navigate(['/get-username'])
      },
      (error: HttpErrorResponse) => {
        alert("Unknown email!");
      }
    );
  }
}
