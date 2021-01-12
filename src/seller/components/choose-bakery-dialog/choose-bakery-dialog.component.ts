import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as bakeryActions from '../../state/actions/bakery.action';

import {Store} from '@ngrx/store';

@Component({
  selector: 'app-choose-bakery-dialog',
  templateUrl: './choose-bakery-dialog.component.html',
  styleUrls: ['./choose-bakery-dialog.component.scss']
})
export class ChooseBakeryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChooseBakeryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      store: Store,
      bakeryId: number,
      sellerId: number
    }) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.store.dispatch(new bakeryActions.AssociateBakeryConfirm(
      this.data.sellerId,
      this.data.bakeryId));
    this.dialogRef.close();
  }


}
