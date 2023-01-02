import {Injectable} from "@angular/core";
import {AppUser} from "../models/appUser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public appUser: AppUser;
}
