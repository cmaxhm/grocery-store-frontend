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

  /**
   * Adds a new product.
   *
   * @param product The product to add.
   */
  public addProduct(product: Partial<Product>): Observable<Product> {
    return this.httpClient.post<Product>(`${ env.apiUrl }/products`, product);
  }

  /**
   * Edits a product.
   *
   * @param product The product to edit.
   */
  public editProduct(product: Product): Observable<Product> {
    return this.httpClient.patch<Product>(`${ env.apiUrl }/products/${ product.id }`, product);
  }

  /**
   * Deletes a product.
   *
   * @param productId The product ID to delete.
   */
  public deleteProduct(productId: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${ env.apiUrl }/products/${ productId }`);
  }
}
