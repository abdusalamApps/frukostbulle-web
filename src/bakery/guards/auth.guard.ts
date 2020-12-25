import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromBakery from '../state';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as fromRoot from '../../app/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromBakery.BakeryState>) {}


  canActivate(): Observable<boolean> {
    return this.store.select(fromBakery.getLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(new fromRoot.Go({ path: ['bakery/login'] }));
        }
      })
    );
  }

}
