import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {OrdersService} from '../../services/orders.service';
import {OrderDetailsCardComponent} from '../order-details/order-details-card/order-details-card.component';

export enum MarkType {
  PAID,
  DELIVERED,
  FAKE
}

@Component({
  selector: 'app-mark-order',
  templateUrl: './mark-order-dialog.component.html',
  styleUrls: ['./mark-order-dialog.component.scss']
})
export class MarkOrderDialog implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<MarkOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      function: any,
      title: string
      object?: any;
      service?: any;
    },
  ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.function(this.data.object, this.data.service);
    this.dialogRef.close();
  }
}
