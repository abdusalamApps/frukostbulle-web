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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromSeller.SellerState>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.select(fromSeller.getAuthResponse).pipe(
      tap(resp => {
        const tokenized = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${resp?.Authorization}`)
        });
        return next.handle(tokenized);
      })
    );
    return next.handle(request);
  }
}
