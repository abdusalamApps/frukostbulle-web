import { User } from './../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/models/authResponse.model';
import * as urls from '../../urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(urls.usersUrls.Post.loginUrl, {
      email,
      password,
    });
  }

  checkAuthenticated() {
    let email = localStorage.getItem('email');
    return this.http.get<User>(
      `${urls.usersUrls.Get.getUserByEmailUrl}${email}`
    );
  }
}
