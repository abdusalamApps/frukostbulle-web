import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UseridPassword} from '../../models/useridPassword.model';
import {Observable} from 'rxjs';
import * as urls from '../../urls';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  checkPassword(useridPassword: UseridPassword): Observable<boolean> {
    return this.http.post<boolean>(`${urls.usersUrls.Post.checkPasswordUrl}`, useridPassword);
  }

  updatePassword(useridPassword: UseridPassword): Observable<any> {
    return this.http.post<any>(`${urls.usersUrls.Post.updatePasswordUrl}`, useridPassword);
  }

}
