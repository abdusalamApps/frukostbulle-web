import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrdersBySellerId(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.getOrdersBySellerIdUrl}${sellerId}`);
  }

  getOrderHistoryBySellerId(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.gerOrderHistoryBySellerIdUrl}${sellerId}`);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${urls.ordersUrls.Post.updateOrderUrl}`, order);
  }

  markOrderDelivered(orderId: number) {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderDeliveredUrl}${orderId}`, {})
  }

  markOrderPaid(orderId: number) {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderPaidUrl}${orderId}`, {})
  }

  markOrderFake(orderId: number) {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderFakeUrl}${orderId}`, {})
  }
}
