import {Component} from "@angular/core";
import {AppUserService} from "../../services/appUser.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {AppUser} from "../../models/appUser";

@Component({
  selector: 'app-getUsername',
  templateUrl: './app.getUsername.html',
  styleUrls: ['./app.getUsername.css']
})
export class AppGetUsername {
  public appUser!: AppUser | null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.appUser = this.dataService.getForgotDetails();
  }
}
