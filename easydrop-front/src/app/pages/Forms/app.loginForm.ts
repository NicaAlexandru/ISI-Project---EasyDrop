import {Component, OnInit} from '@angular/core';
import { AppUser } from '../../models/appUser'
import {AppUserService} from "../../services/appUser.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './app.loginForm.html',
  styleUrls: ['./app.loginForm.css']
})
export class AppLoginForm implements OnInit {
  title = 'EasyDrop';

  public appUsers!: AppUser[];

  constructor(private appUserService: AppUserService) { }

  onSubmit(userItem: AppUser) {
    console.log(userItem);
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.appUserService.getAppUsers().subscribe(
      (response: AppUser[]) => {
        this.appUsers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
