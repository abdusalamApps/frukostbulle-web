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
    return this.http.get<Bakery[]>(urls.bakeryUrls.Get.getBakeries);
  }

  getBakeriesByCity(city: string): Observable<Bakery[]> {
    return this.http.get<Bakery[]>(`${urls.bakeryUrls.Get.getBakeriesByCity}${city}`);
  }

  getBakeriesByCounty(county: string): Observable<Bakery[]> {
    return this.http.get<Bakery[]>(`${urls.bakeryUrls.Get.getBakeriesByCounty}${county}`);
  }

  associateBakery(userId: number, bakeryId: number) {
    return this.http.post<any>(`${urls.bakeryUrls.Post.associateBakery}?userId=${userId}&bakeryId=${bakeryId}`, {});
  }
}
