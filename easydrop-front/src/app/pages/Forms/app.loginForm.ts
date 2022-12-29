import { Component } from '@angular/core';
import { AppUser } from '../../models/appUser'

@Component({
  selector: 'app-login',
  templateUrl: './app.loginForm.html',
  styleUrls: ['./app.loginForm.css']
})
export class AppLoginForm {
  title = 'EasyDrop';

  onSubmit(userItem: AppUser) {
    console.log(userItem);
  }
}
