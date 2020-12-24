import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import * as urls from '../../urls';
import {Area} from '../../models/area.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) {
  }

  updateArea(area: Area): Observable<any> {
    return this.http.post<any>(urls.areasUrls.Post.updateAreaUrl, area);
  }

  getAreaBySellerId(sellerId: number): Observable<Area> {
    return this.http.get<Area>(`${urls.areasUrls.Get.getAreaBySellerIdUrl}${sellerId}`);
  }

  getAllAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${urls.areasUrls.Get.getAreasUrl}`);
  }

}
