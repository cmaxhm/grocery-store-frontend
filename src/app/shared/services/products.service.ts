import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the products list.
   */
  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${ env.apiUrl }/products`);
  }
}
