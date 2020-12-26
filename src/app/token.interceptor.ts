import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as fromSeller from '../seller/state';
import * as fromBuyer from '../buyer/state';
import * as fromAdmin from '../admin/state';
import * as fromBakery from '../bakery/state';

import {Store} from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store1: Store<fromSeller.SellerState>,
              private store2: Store<fromBuyer.BuyerState>,
              private store3: Store<fromAdmin.AdminState>,
              private store4: Store<fromBakery.BakeryState>,) {
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
