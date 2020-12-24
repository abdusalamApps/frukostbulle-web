import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromBuyer from '../state';
import * as fromRoot from '../../app/state';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromBuyer.BuyerState>) {}


  canActivate(): Observable<boolean> {
    return this.store.select(fromBuyer.getBuyerLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(new fromRoot.Go({ path: ['buyer/login'] }));
        }
      })
    );
  }
}
