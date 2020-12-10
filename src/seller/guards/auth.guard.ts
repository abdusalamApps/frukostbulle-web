import { AuthState } from './../../app/state/reducers/auth.reducer';
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
import * as fromStore from '../../app/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromStore.getAuthenticated).pipe(
      tap((authed) => {
        if (!authed) {
          this.store.dispatch(new fromStore.Go({ path: ['login'] }));
        }
      })
    );
  }
}
