import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../state';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): Observable<boolean> {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      this.store.dispatch(new fromState.LoadCurrentUserBakery(parseInt(userId, 10)));
    }
    return of(true);
  }

}
