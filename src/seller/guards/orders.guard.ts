import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../state';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersGuard implements CanActivate {


  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): Observable<boolean> {
    let userId = '';
    const fromStorage = localStorage.getItem('currentUserId');
    if (fromStorage) {
      userId = fromStorage;
    }
    return this.checkStore(parseInt(userId, 10)).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(sellerId: number): Observable<boolean> {
    return this.store.select(fromState.getOrdersLoaded).pipe(
      tap((loaded) => {
        this.store.dispatch(new fromState.LoadSellerOrders(sellerId));
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
