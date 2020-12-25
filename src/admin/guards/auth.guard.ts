import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAdmin from '../../admin/state';
import {tap} from 'rxjs/operators';
import * as fromRoot from '../../app/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAdmin.AdminState>) {}


  canActivate(): Observable<boolean> {
    return this.store.select(fromAdmin.getLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(new fromRoot.Go({ path: ['admin/login'] }));
        }
      })
    );
  }
}
