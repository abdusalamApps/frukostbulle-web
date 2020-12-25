import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as fromSeller from '../seller/state';
import {Store} from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromSeller.SellerState>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    if (token) {
      const tokenized = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(tokenized);
    }
    return next.handle(request);
  }
}
