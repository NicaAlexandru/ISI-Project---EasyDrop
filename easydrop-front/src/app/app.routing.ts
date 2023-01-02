import { Routes, RouterModule} from "@angular/router";
import {AppLoginForm} from "./pages/Forms/app.loginForm";
import {AppSignupForm} from "./pages/Forms/app.signupForm";
import {AppClientBasemap} from "./pages/Map/CLIENT/app-client.basemap";
import {AppSellerBasemap} from "./pages/Map/SELLER/app-seller.basemap";
import {AppCourierBasemap} from "./pages/Map/COURIER/app-courier.basemap";
import {AppForgotPassword} from "./pages/Forms/app.forgotPassword";
import {AppForgotUsername} from "./pages/Forms/app.forgotUsername";
import {AppGetUsername} from "./pages/Forms/app.getUsername";

/* The routing list; Order matters! */
const appRoutes: Routes = [
  { path: '', component: AppLoginForm },
  { path: 'login', component: AppLoginForm },
  { path: 'signup', component: AppSignupForm },
  { path: 'client-basemap', component: AppClientBasemap },
  { path: 'seller-basemap', component: AppSellerBasemap },
  { path: 'courier-basemap', component: AppCourierBasemap },
  { path: 'forgot-password', component: AppForgotPassword },
  { path: 'forgot-username', component: AppForgotUsername },
  { path: 'get-username', component: AppGetUsername}
];

export const routing = RouterModule.forRoot(appRoutes);


