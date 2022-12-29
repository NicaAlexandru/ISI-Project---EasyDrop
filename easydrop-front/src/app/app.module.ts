import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppLoginForm } from './pages/Forms/app.loginForm';
import { AppSignupForm} from "./pages/Forms/app.signupForm";
import { AppComponent} from "./app.component";
import { routing} from "./app.routing";
import { HttpClientModule} from "@angular/common/http";

/*
 Bootstrap -> the point of start of the application
 */
@NgModule({
  declarations: [
    AppComponent,
    AppLoginForm,
    AppSignupForm
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
