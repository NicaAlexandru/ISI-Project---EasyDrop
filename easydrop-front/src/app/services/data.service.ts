import {Injectable} from "@angular/core";
import {AppUser} from "../models/appUser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public setAppUser(appUser: AppUser) {
    localStorage.setItem('appUser', JSON.stringify(appUser));
  }

  public setLoggedSeller(logged_seller: AppUser) {
    localStorage.setItem('logged_seller', JSON.stringify(logged_seller));
  }

  public setLoggedClient(logged_client: AppUser) {
    localStorage.setItem('logged_client', JSON.stringify(logged_client));
  }

  public setLoggedCourier(logged_courier: AppUser) {
    localStorage.setItem('logged_courier', JSON.stringify(logged_courier));
  }

  public setForgotUserDetails(user: AppUser) {
    localStorage.setItem('forgotDetails', JSON.stringify(user));
  }

  public getAppUser(): AppUser | null {
    let appUser = localStorage.getItem('appUser');

    if (appUser != null)
      return JSON.parse(appUser);

    return null;
  }

  public getLoggedCourier(): AppUser | null {
    let logged_courier = localStorage.getItem('logged_courier');

    if (logged_courier != null)
      return JSON.parse(logged_courier);

    return null;
  }

  public getLoggedSeller(): AppUser | null {
    let logged_seller = localStorage.getItem('logged_seller');

    if (logged_seller != null)
      return JSON.parse(logged_seller);

    return null;
  }

  public getLoggedClient(): AppUser | null {
    let logged_client = localStorage.getItem('logged_client');

    if (logged_client != null)
      return JSON.parse(logged_client);

    return null;
  }

  public getForgotDetails(): AppUser | null {
    let user = localStorage.getItem('forgotDetails');

    if (user != null)
      return JSON.parse(user);

    return null;
  }
}
