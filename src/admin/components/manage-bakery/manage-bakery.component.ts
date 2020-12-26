import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../seller/services/users.service';
import * as fromRoot from '../../../app/state';
import {Bakery} from '../../../models/bakery.model';

@Component({
  selector: 'app-manage-bakery',
  templateUrl: './manage-bakery.component.html',
  styleUrls: ['./manage-bakery.component.scss']
})
export class ManageBakeryComponent implements OnInit, OnDestroy {
  title = 'Hantera bageri';
  bakery$ = new Observable<Bakery>();

  deleteSub = new Subscription();

  constructor(private store: Store<fromState.AdminState>,
              private dialog: MatDialog,
              private userService: UsersService) {

  }


  ngOnInit(): void {
    this.bakery$= this.store.select(fromState.getSelectedBakery);

  }

  delete(bakeryId: number): void {
    this.dialog.open(DeleteBakeryDialog, {
      data: {
        component: this,
        bakeryId: bakeryId
      }
    });
  }

  public confirmDelete(bakeryId: number): void {
    this.userService.deleteUser(bakeryId).subscribe(
      res => {
        console.log(`user with id ${bakeryId} deleted`);
        this.store.dispatch(new fromRoot.Go({path:['/admin/bakeries'], extras: {replaceUrl: true}}));
      },
      error => console.log(`error ${error} deleting user with id ${bakeryId}`)
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
  selector: 'app-manage-bakery',
  template: `<h2 mat-dialog-title>Är du säker?</h2>
  <div mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Ja</button>
    <button mat-button (click)="onNoClick()">Nej</button>
  </div>`,
  styleUrls: ['./manage-bakery.component.scss']
})

export class DeleteBakeryDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteBakeryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      component: ManageBakeryComponent,
      bakeryId: number
    }) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.data.component.confirmDelete(this.data.bakeryId);
    this.dialogRef.close();
  }
}

