import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bakery} from '../../models/bakery.model';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {B} from '@angular/cdk/keycodes';


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

  associateBakery(userId: number, bakeryId: number) {
    return this.http.post<any>(`${urls.bakeryUrls.Post.associateBakeryUrl}?userId=${userId}&bakeryId=${bakeryId}`, {});
  }

  getBakeryById(bakeryId: number): Observable<Bakery> {
    return this.http.get<Bakery>(`${urls.bakeryUrls.Get.getBakeryByIdUrl}${bakeryId}`);
  }

}