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

  login(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(urls.usersUrls.Get.loginUrl);
  }
}
