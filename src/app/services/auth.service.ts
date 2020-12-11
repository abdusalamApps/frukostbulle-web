import { LoginInfo } from '../../models/loginInfo.model';
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

  login(info: LoginInfo): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(urls.usersUrls.Post.loginUrl, info);
  }

}
