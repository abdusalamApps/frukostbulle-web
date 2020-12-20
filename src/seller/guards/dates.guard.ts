import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromState from '../state';
import {Store} from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatesGuard implements CanActivate {
  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    const storage = localStorage.getItem('currentUserEmail');
    let email = '';
    if (storage) {
      email = storage;
    }
    return this.store.select(fromState.getCurrentUserLoaded).pipe(
      tap(loaded => {
        this.store.dispatch(new fromState.LoadCurrentUser(email));
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  getUserEmail(): string {
    this.store.select(fromState.getAuthEmail).pipe(
      tap(email => {
        if (email) {
          return email;
        }
        return '';
      })
    );
    return '';
  }

}
