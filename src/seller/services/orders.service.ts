import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersBySellerId(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urls.ordersUrls.Get.getOrdersBySellerIdUrl}${sellerId}`)
  }
}
