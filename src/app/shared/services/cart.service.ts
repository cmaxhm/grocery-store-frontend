import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments/environment';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Sends the order to the server.
   *
   * @param order The order to send.
   */
  public sendOrder(order: Partial<Order>): Observable<Order> {
    return this.httpClient.post<Order>(`${ env.apiUrl }/orders`, order);
  }
}
