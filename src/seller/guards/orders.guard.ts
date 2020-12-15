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
    let userId: string = '';
    let fromStorage = localStorage.getItem('currentUserId');
    if (fromStorage) {
      userId = fromStorage;
    }
    return this.checkStore(parseInt(userId)).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(sellerId: number): Observable<boolean> {
    return this.store.select(fromState.getOrdersLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new fromState.LoadSellerOrders(sellerId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
