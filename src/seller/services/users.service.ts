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
    return this.http.get<User>(`${urls.usersUrls.Get.getUserByEmailUrl}${email}`);
  }
}
