import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bakery} from '../../models/bakery.model';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';


@Injectable({
  providedIn: 'root'
})
export class BakeryService {

  constructor(private http: HttpClient) {
  }

  getBakeries(): Observable<Bakery[]> {
    return this.http.get<Bakery[]>(urls.bakeryUrls.Get.getBakeriesUrl);
  }

  getBakeriesByCity(city: string): Observable<Bakery[]> {
    return this.http.get<Bakery[]>(`${urls.bakeryUrls.Get.getBakeriesByCityUrl}${city}`);
  }

  getBakeriesByCounty(county: string): Observable<Bakery[]> {
    return this.http.get<Bakery[]>(`${urls.bakeryUrls.Get.getBakeriesByCountyUrl}${county}`);
  }

  associateBakery(userId: number, bakeryId: number): Observable<any> {
    return this.http.post<any>(`${urls.bakeryUrls.Post.associateBakeryUrl}`, {firstId: userId, secondId: bakeryId});
  }

  getBakeryById(bakeryId: number): Observable<Bakery> {
    return this.http.get<Bakery>(`${urls.bakeryUrls.Get.getBakeryByIdUrl}${bakeryId}`);
  }

  getBakeryBySellerId(sellerId: number): Observable<Bakery> {
    return this.http.get<Bakery>(`${urls.bakeryUrls.Get.getBakeryByIdSellerUrl}${sellerId}`);
  }

}
