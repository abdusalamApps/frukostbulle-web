import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../seller/services/users.service';
import * as fromRoot from '../../../app/state';

@Component({
  selector: 'app-manage-buyer',
  templateUrl: './manage-buyer.component.html',
  styleUrls: ['./manage-buyer.component.scss']
})
export class ManageBuyerComponent implements OnInit, OnDestroy {
  title = 'Hantera köpare';
  buyer$ = new Observable<User>();

  deleteSub = new Subscription();

  constructor(private store: Store<fromState.AdminState>,
              private dialog: MatDialog,
              private userService: UsersService) {

  }

  ngOnInit(): void {
    this.buyer$= this.store.select(fromState.getSelectedBuyer);
  }

  delete(buyerId: number): void {
    this.dialog.open(DeleteBuyerDialog, {
      data: {
        component: this,
        buyerId: buyerId
      }
    });
  }

  public confirmDelete(buyerId: number): void {
    this.userService.deleteUser(buyerId).subscribe(
      res => {
        console.log(`user with id ${buyerId} deleted`);
        this.store.dispatch(new fromRoot.Go({path:['/admin/sellers-and-buyers'], extras: {replaceUrl: true}}));
      },
      error => console.log(`error ${error} deleting user with id ${buyerId}`)
    )
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }
}

@Component({
  selector: 'app-manage-buyer',
  template: `<h2 mat-dialog-title>Är du säker?</h2>
  <div mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Ja</button>
    <button mat-button (click)="onNoClick()">Nej</button>
  </div>`,
  styleUrls: ['./manage-buyer.component.scss']
})

export class DeleteBuyerDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteBuyerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      component: ManageBuyerComponent,
      buyerId: number
    }) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.data.component.confirmDelete(this.data.buyerId);
    this.dialogRef.close();
  }
}
