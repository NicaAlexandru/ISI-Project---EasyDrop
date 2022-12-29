import { AppUser} from "../models/appUser";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private apiServerUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  public getAppUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerUrl}/allUsers`);
  }

  public addAppUsers(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerUrl}/add`, appUser);
  }

  public updateAppUsers(appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiServerUrl}/update`, appUser);
  }

  public deleteAppUsers(idUser: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/{$idUser}`);
  }
}
