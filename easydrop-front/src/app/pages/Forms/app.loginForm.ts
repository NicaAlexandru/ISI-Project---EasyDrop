import { Component } from '@angular/core';
import { User } from '../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './app.loginForm.html',
  styleUrls: ['./app.loginForm.css']
})
export class AppLoginForm {
  title = 'EasyDrop';

  onSubmit(userItem: User) {
    console.log(userItem);
  }
}
