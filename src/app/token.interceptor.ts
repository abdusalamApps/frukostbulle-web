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
import {tap} from 'rxjs/operators';
import * as fromSellerState from 'src/seller/state';
import * as fromBuyerState from 'src/buyer/state';
import * as fromAdminState from 'src/admin/state';
import * as fromBakeryState from 'src/bakery/state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromSeller.SellerState>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let t: string | undefined = '';

    this.store.select(fromSellerState.getSellerState).pipe(
      tap(state => {
        if (state) {
          this.store.select(fromSellerState.getToken).subscribe(token => t = token).unsubscribe();
        }
      })
    );

    this.store.select(fromBuyerState.getBuyerState).pipe(
      tap(state => {
        if (state) {
          this.store.select(fromBuyerState.getBuyerToken).subscribe(token => t = token).unsubscribe();
        }
      })
    );

    this.store.select(fromAdminState.getAdminState).pipe(
      tap(state => {
        if (state) {
          this.store.select(fromAdminState.getToken).subscribe(token => t = token).unsubscribe();
        }
      })
    );

    this.store.select(fromBakeryState.getBakeryState).pipe(
      tap(state => {
        if (state) {
          this.store.select(fromBakeryState.getToken).subscribe(token => t = token).unsubscribe();
        }
      })
    );

    const tokenized = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${t}`)
    });

    if (t == null || t === '' || t === undefined) {
      return next.handle(request);
    }
    return next.handle(tokenized);

  }
}
