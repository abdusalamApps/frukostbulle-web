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
    console.log('email in the user.service: ' + email);
    return this.http.get<User>(urls.usersUrls.Get.getUserByEmailUrl + email);

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

  createUser(user: User, coordinates: { lat: number, lng: number }[]): Observable<number> {
    return this.http.post<number>(`${urls.usersUrls.Post.createUserUrl}`, {user, coordinates});
  }

  createUserNoPass(user: User, coordinates: []): Observable<number> {
    return this.http.post<number>(`${urls.usersUrls.Post.createUserNoPassUrl}`, {user, coordinates});
  }

  sendConfirmationEmail(email: string): Observable<any> {
    return this.http.post(`${urls.usersUrls.Post.sendCreateEmailUrl}`, email);
  }

  confirmAccount(email: string, code: number): Observable<any> {
    return this.http.get(`${urls.usersUrls.Post.confirmAccountUrl}?userEmail=${email}&code=${code}`);
  }

  adminConfirmAccount(email: string): Observable<any> {
    return this.http.post(`${urls.usersUrls.Post.adminConfirmAccount}` , {email});
  }

  associateSeller(buyerId: number, sellerId: number): Observable<any> {
    return this.http.post<any>(
      `${urls.usersUrls.Post.associateSellerUrl}`, {firstId: buyerId, secondId: sellerId});
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.post<any>(
      `${urls.usersUrls.Post.deleteUserByIdUrl}${userId}`,
      {}
    );
  }

  resetPassword(userId: number, code: number): Observable<boolean> {
    return this.http.get<boolean>(`${urls.usersUrls.Get.resetPasswordUrl}?userId=${userId}&code=${code}`);
  }

  sendResetPassEmail(email: string): Observable<string> {
    return this.http.post<string>(`${urls.usersUrls.Post.sendResetPassEmailUrl}?userEmail=${email}`, {});
  }
}
