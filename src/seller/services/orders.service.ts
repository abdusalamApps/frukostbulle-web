import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';
import {OrderHistory} from '../../models/order-history.model';

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

  getOrderHistoryBySellerId(sellerId: number): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>(`${urls.ordersUrls.Get.gerOrderHistoryBySellerIdUrl}${sellerId}`);
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

  getStatistics(sellerId: number): Observable<{ name: number, value: number }[]> {
    return this.http.get<{ name: number, value: number }[]>
    (`${urls.ordersUrls.Get.gerSellerStatisticsUrl}?sellerId=${sellerId}`);
  }

  getSellerPdf(sellerId: number, bakeryId: number, begin: string, end: string): Observable<any> {
    return this.http.get<any>
    (`${urls.ordersUrls.Get.sellerPdfUrl}?sellerId=${sellerId}&bakeryId=${bakeryId}&begin=${begin}&end=${end}`);
  }
}
