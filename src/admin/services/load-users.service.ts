import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {PermissionLevel, User} from '../../models/user.model';
import {Bakery} from '../../models/bakery.model';

@Injectable({
  providedIn: 'root'
})
export class LoadUsersService {

  constructor(private http: HttpClient) {
  }
  getAllBakeries(): Observable<Bakery[]>{
    return this.http.get<Bakery[]>(`${urls.bakeryUrls.Get.getBakeriesUrl}`);
  }

  getAllSellers(): Observable<User[]>{
    return this.http.get<User[]>(`${urls.usersUrls.Get.getUsersByPermissionLevelUrl}${PermissionLevel.SELLER}`);
  }
  getAllBuyers(): Observable<User[]>{
    return this.http.get<User[]>(`${urls.usersUrls.Get.getUsersByPermissionLevelUrl}${PermissionLevel.BUYER}`);
  }

}
