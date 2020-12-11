import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/state';
import * as fromRoot from '../../app/state';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.AuthState>) {}

  canActivate(): Observable<boolean> {
    let token = localStorage.getItem('toke');
    return this.checkStoreAuthentication().pipe(
      switchMap((authenticated) => {
        if (authenticated) {
          return of(true);
        }
        if (token) {
          return of(true);
        }
        this.store.dispatch(new fromRoot.Go({ path: ['login'] }));
        return of(false);
      })
    );
    if (token == undefined) {
      this.store.dispatch(new fromRoot.Go({ path: ['login'] }));
      return of(false);
    }
    return of(true);
  }

  checkStoreAuthentication() {
    return this.store.select(fromAuth.getAuthState).pipe(take(1));
  }
}
