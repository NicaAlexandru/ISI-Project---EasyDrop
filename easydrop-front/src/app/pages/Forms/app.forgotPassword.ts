import {Component} from "@angular/core";
import {AppUser} from "../../models/appUser";
import {HttpErrorResponse} from "@angular/common/http";
import {AppUserService} from "../../services/appUser.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './app.forgotPassword.html',
  styleUrls: ['./app.forgotPassword.css']
})
export class AppForgotPassword {
  private appUser!: AppUser;

  constructor(private appUserService: AppUserService, private dataService: DataService, private router: Router) { }

  onSubmit(userItem: AppUser) {
      this.appUserService.getAppUserByEmail(userItem.email).subscribe(
        (response: AppUser) => {
          this.appUser = response;
          this.dataService.setForgotUserDetails(this.appUser);
          this.router.navigate(['/get-password'])
        },
        (error: HttpErrorResponse) => {
          alert("Unknown email!");
        }
      );
  }
}
