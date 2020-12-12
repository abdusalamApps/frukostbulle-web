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
import * as fromState from '../seller/state/selectors/login.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromSeller.SellerState>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let t: string | undefined = '';
    this.store.select(fromState.getToken).subscribe(token => t = token).unsubscribe();
    const tokenized = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${t}`)
    });
    return next.handle(tokenized);

  }
}