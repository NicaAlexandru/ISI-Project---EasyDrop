import { Routes, RouterModule} from "@angular/router";
import {AppLoginForm} from "./pages/Forms/app.loginForm";
import {AppSignupForm} from "./pages/Forms/app.signupForm";
import {AppBasemap} from "./pages/Map/app.basemap";

/* The routing list; Order matters! */
const appRoutes: Routes = [
  { path: '', component: AppLoginForm },
  { path: 'login', component: AppLoginForm },
  { path: 'signup', component: AppSignupForm },
  { path: 'basemap', component: AppBasemap }
];

export const routing = RouterModule.forRoot(appRoutes);


