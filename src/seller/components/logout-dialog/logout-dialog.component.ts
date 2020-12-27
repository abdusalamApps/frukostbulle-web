import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as sellerActions from 'src/seller/state/actions/login.action';
import * as buyerActions from 'src/buyer/state/actions/buyerLoginAction';
import * as adminActions from 'src/admin/state/actions/login.action';
import * as bakeryActinos from 'src/bakery/state/actions/bakery-login.action';
import {PermissionLevel} from "../../../models/user.model";

@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
})
export class LogoutDialog {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      store: Store,
      name: string,
      permissionLevel: PermissionLevel
    }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    switch (this.data.permissionLevel) {
      case PermissionLevel.Admin: {
        this.data.store.dispatch(new adminActions.LogoutConfirm());
        break;
      }
      case PermissionLevel.BAKERY: {
        this.data.store.dispatch(new bakeryActinos.LogoutBakeryConfirm());
        break;
      }
      case PermissionLevel.BUYER: {
        this.data.store.dispatch(new buyerActions.BuyerLogoutConfirm());
        break;
      }
      case PermissionLevel.SELLER: {
        this.data.store.dispatch(new sellerActions.LogoutConfirm());
        break;
      }
    }
    this.dialogRef.close();
  }

}

