import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/models/authUser.model';
import * as urls from '../../urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(urls.usersUrls.Get.loginUrl);
  }
}
