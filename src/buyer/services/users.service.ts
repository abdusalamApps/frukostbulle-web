import {Injectable} from '@angular/core';
import * as urls from '../../urls';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    const jsonString = JSON.stringify(email);
    const e = jsonString.substring(12, jsonString.search(',') - 1);
    return this.http.get<User>(urls.usersUrls.Get.getUserByEmailUrl + e);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(urls.usersUrls.Get.getUserByIdUrl + id);
  }


  updateUser(user: User): Observable<User> {
    return this.http.post<User>(urls.usersUrls.Post.updateUserUrl, user);
  }

  updateSellerDates(sellerId: number, dates: Date[]): Observable<any> {
    return this.http.post<any>(`${urls.usersUrls.Post.updateSellerDatesUrl}`, {sellerId, dates});
  }

}
