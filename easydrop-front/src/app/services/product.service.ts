import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {Storehouse} from "../models/storehouse";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/allProducts`);
  }

  public getProductByIdStorehouse(id_storehouse: string): Observable<Product []> {
    return this.http.get<Product[]>(`${this.apiServerUrl}//findByIdStorehouse/${id_storehouse}`);
  }

  public getProductByProductName(product_name: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/findByProductName/${product_name}`);
  }

  public getProductByProductId(product_id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/findByProductId/${product_id}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/add`, product);
  }

  public deleteProduct(id_product: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id_product}`);
  }
}
