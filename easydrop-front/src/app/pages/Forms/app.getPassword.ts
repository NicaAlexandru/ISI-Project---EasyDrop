import {Component} from "@angular/core";
import {AppUserService} from "../../services/appUser.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {AppUser} from "../../models/appUser";

@Component({
  selector: 'app-getPassword',
  templateUrl: './app.getPassword.html',
  styleUrls: ['./app.getPassword.css']
})

export class AppGetPassword {
  public appUser!: AppUser | null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.appUser = this.dataService.getForgotDetails();
  }
}
