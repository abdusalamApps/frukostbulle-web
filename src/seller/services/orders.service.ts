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

  getOrdersByBakeryId(bakeryId: number): Observable<Order[]> {
    console.log(`bakeryId@OrdersService: ${bakeryId}`);
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.getOrdersByBakeryIdUrl}${bakeryId}`);
  }

  getOrderHistoryBySellerId(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.gerOrderHistoryBySellerIdUrl}${sellerId}`);
  }

  getOrderHistoryByBakeryId(bakeryId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.gerOrderHistoryByBakeryIdUrl}${bakeryId}`);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${urls.ordersUrls.Post.updateOrderUrl}`, order);
  }

  markOrderDelivered(orderId: number): Observable<any> {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderDeliveredUrl}${orderId}`, {});
  }

  markOrderPaid(orderId: number): Observable<any> {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderPaidUrl}${orderId}`, {});
  }

  markOrderFake(orderId: number): Observable<any> {
    return this.http.post<any>(`${urls.ordersUrls.Post.markOrderFakeUrl}${orderId}`, {});
  }

  insertOrder(order: Order): Observable<any> {
    return this.http.post(`${urls.ordersUrls.Post.insertOrderUrl}`, order);
  }
}
