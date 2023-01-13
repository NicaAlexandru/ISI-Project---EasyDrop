import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppLoginForm } from './pages/Forms/app.loginForm';
import { AppSignupForm} from "./pages/Forms/app.signupForm";
import { AppComponent} from "./app.component";
import { routing} from "./app.routing";
import { HttpClientModule} from "@angular/common/http";
import {AppClientBasemap} from "./pages/Map/CLIENT/app-client.basemap";
import {AppCourierBasemap} from "./pages/Map/COURIER/app-courier.basemap";
import {AppSellerBasemap} from "./pages/Map/SELLER/app-seller.basemap";
import {AppForgotPassword} from "./pages/Forms/app.forgotPassword";
import {AppGetPassword} from "./pages/Forms/app.getPassword";
import {AppForgotUsername} from "./pages/Forms/app.forgotUsername";
import {AppGetUsername} from "./pages/Forms/app.getUsername";

/*
 Bootstrap -> the point of start of the application
 */
@NgModule({
  declarations: [
    AppComponent,
    AppLoginForm,
    AppSignupForm,
    AppForgotPassword,
    AppForgotUsername,
    AppGetUsername,
    AppClientBasemap,
    AppCourierBasemap,
    AppSellerBasemap,
    AppGetPassword
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
