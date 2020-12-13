import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';

import * as fromState from '../state/selectors/login.selectors';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {SellerState} from '../state/reducers';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  token: string | undefined = '';

  constructor(private http: HttpClient, private store: Store<SellerState>) {
  }

  getSellerItems(email: string | undefined ): Observable<Item[]> {
    return this.http.get<Item[]>(`${urls.itemsUrls.Get.getItemBySellerEmail}${email}`);

  }

  getSellerItemsById(id: number | undefined) {
    return this.http.get<Item[]>(`${urls.itemsUrls.Get.getItemBySellerId}${id}`);

  }

  insertItem(item: Item) {
    console.log(`on insertItem()@ItemsService`);
    return this.http.post<any>(`${urls.itemsUrls.Post.insertItemUrl}`, item);
  }

  updateItem(item: Item) {
    return this.http.post<any>(`${urls.itemsUrls.Post.updateItemUrl}`, item);
  }

  deleteItem(itemId: number) {
    console.log(`itemId in deleteItem()@ItemsService: ${itemId}`);
    return this.http.post<any>(`${urls.itemsUrls.Post.deleteItemUrl}${itemId}`, {'itemId': itemId});
  }
}
