import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {PermissionLevel, User} from '../../../models/user.model';
import {UsersService} from '../../../seller/services/users.service';

@Component({
  selector: 'app-manage-seller',
  templateUrl: './manage-seller.component.html',
  styleUrls: ['./manage-seller.component.scss']
})
export class ManageSellerComponent implements OnInit, OnDestroy {
  title = 'Hantera säljare';

  seller$ = new Observable<User>();

  deleteSub = new Subscription();
  cEmailSubscription = new Subscription();

  constructor(private store: Store<fromState.AdminState>,
              private dialog: MatDialog,
              private userService: UsersService) {

  }

  ngOnInit(): void {
    this.seller$= this.store.select(fromState.getSelectedSeller);
  }

  delete(sellerId: number): void {
    this.dialog.open(DeleteDialog, {
      data: {
        component: this,
        sellerId: sellerId
      }
    });
  }

  public confirmDelete(sellerId: number): void {
    this.userService.deleteUser(sellerId).subscribe(
      res => {
        console.log(`user with id ${sellerId} deleted`);
        this.store.dispatch(new fromRoot.Go({path:['/admin/sellers-and-buyers'], extras: {replaceUrl: true}}));
      },
      error => console.log(`error ${error} deleting user with id ${sellerId}`)
    )
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
    this.cEmailSubscription.unsubscribe();

  }

  activeSeller(seller: User) {
    console.log("activeSeller");
    this.cEmailSubscription = this.userService.adminConfirmAccount(seller.email).subscribe(
      res => {
        this.navigateBack();
      },
      err => {
        console.log(`send confirmation email failed ${JSON.stringify(err)}`);
      }
    );
  }
}

@Component({
  selector: 'app-manage-seller',
  template: `<h2 mat-dialog-title>Är du säker?</h2>
  <div mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Ja</button>
    <button mat-button (click)="onNoClick()">Nej</button>
  </div>`,
  styleUrls: ['./manage-seller.component.scss']
})

export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      component: ManageSellerComponent,
      sellerId: number
    }) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.data.component.confirmDelete(this.data.sellerId);
    this.dialogRef.close();
  }


}
