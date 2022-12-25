import { Routes, RouterModule} from "@angular/router";
import {AppLoginForm} from "./pages/Forms/app.loginForm";
import {AppSignupForm} from "./pages/Forms/app.signupForm";

/* The routing list; Order matters! */
const appRoutes: Routes = [
  { path: 'login', component: AppLoginForm },
  { path: 'signup', component: AppSignupForm},
  { path: '', component: AppLoginForm}
];

export const routing = RouterModule.forRoot(appRoutes);


