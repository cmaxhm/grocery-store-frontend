import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments/environment';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the orders list.
   */
  public getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${ env.apiUrl }/orders`);
  }

  /**
   * Sends the order to the server.
   *
   * @param order The order to send.
   */
  public sendOrder(order: Partial<Order>): Observable<Order> {
    return this.httpClient.post<Order>(`${ env.apiUrl }/orders`, order);
  }
}
