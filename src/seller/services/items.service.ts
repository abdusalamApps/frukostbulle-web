import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(urls.itemsUrls.Get.getAllItemsUrl);
  }
}
