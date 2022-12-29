import { AppUser} from "../models/appUser";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

  public getAppUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerUrl}/users/allUsers`);
  }

  public addAppUsers(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerUrl}/users/add`, appUser);
  }

  public updateAppUsers(appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiServerUrl}/users/update`, appUser);
  }

  public deleteAppUsers(idUser: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/{$idUser}`);
  }
}
