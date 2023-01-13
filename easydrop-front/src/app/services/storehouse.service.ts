import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Storehouse} from "../models/storehouse";

@Injectable({
  providedIn: 'root'
})
export class StorehouseService {
  private apiServerUrl = 'http://localhost:8080/stores';

  constructor(private http: HttpClient) { }

  public getStores(): Observable<Storehouse[]> {
    return this.http.get<Storehouse[]>(`${this.apiServerUrl}/allStores`);
  }

  public getStoreById(id_storehouse: string): Observable<Storehouse> {
    return this.http.get<Storehouse>(`${this.apiServerUrl}/findById/${id_storehouse}`);
  }

  public getStoreByName(storehouse_name: string): Observable<Storehouse> {
    return this.http.get<Storehouse>(`${this.apiServerUrl}/findByName/${storehouse_name}`);
  }

  public getStoresBySellerId(id_seller: string): Observable<Storehouse[]> {
    return this.http.get<Storehouse[]>(`${this.apiServerUrl}/findBySellerId/${id_seller}`);
  }

  public addStorehouse(storehouse: Storehouse): Observable<Storehouse> {
    return this.http.post<Storehouse>(`${this.apiServerUrl}/add`, storehouse);
  }

  public updateStorehouse(storehouse: Storehouse): Observable<Storehouse> {
    return this.http.put<Storehouse>(`${this.apiServerUrl}/update`, storehouse);
  }

  public deleteAppUsers(id_storehouse: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id_storehouse}`);
  }
}
