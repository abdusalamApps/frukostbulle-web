import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../seller/services/users.service';
import * as fromRoot from '../../../app/state';
import {Bakery} from '../../../models/bakery.model';
import {FormControl, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {PermissionLevel, User} from '../../../models/user.model';
import {CitiesService} from '../../../seller/services/cities.service';

@Component({
  selector: 'app-manage-bakery',
  templateUrl: './manage-bakery.component.html',
  styleUrls: ['./manage-bakery.component.scss']
})
export class ManageBakeryComponent implements OnInit, OnDestroy {
  title = 'Hantera bageri';
  bakery$ = new Observable<Bakery>();

  deleteSub = new Subscription();

  nameControl = new FormControl();
  mobileControl = new FormControl();
  streetControl = new FormControl();
  cityControl = new FormControl();

  userSubscription$ = new Subscription();
  cEmailSubscription = new Subscription();
  confirmSubscription$ = new Subscription();

  constructor(private store: Store<fromState.AdminState>,
              private dialog: MatDialog,
              private citiesService: CitiesService,
              private userService: UsersService) {

  }


  ngOnInit(): void {
    this.bakery$= this.store.select(fromState.getSelectedBakery).pipe(
      tap(bakery => {
        if (bakery) {
          this.mobileControl = new FormControl(bakery.mobilenbr, [
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
          this.nameControl = new FormControl(bakery.name, [
            Validators.required,
            Validators.minLength(2)
          ]);
          this.cityControl = new FormControl(bakery.city, [
            Validators.minLength(2),
            Validators.required
          ]);
          this.streetControl = new FormControl(bakery.address, [
            Validators.minLength(5),
            Validators.required

          ]);
        }
      })
    );

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
    this.userSubscription$.unsubscribe();
    this.cEmailSubscription.unsubscribe();
    this.confirmSubscription$.unsubscribe();
  }

  onUpdateBakery(bakery: Bakery) {
    const newBakery: User = {
      id: bakery.id,
      name: this.nameControl.value,
      county: this.getCounty(this.cityControl.value),
      city: this.cityControl.value,
      address: this.streetControl.value,
      mobilenbr: this.mobileControl.value,
      email: bakery.email,
      password: '',
      permissionLevel: PermissionLevel.BAKERY,
      reminder: false,
      associatedBakery: -1,
      associatedSeller: -1,
      active: true,
      availableDates: [],
      orderBuffer: -1,
      lasOrderDay: '',
      profilePictureUrl: ''
    };
    this.userService.updateUser(newBakery).subscribe(
      res =>{
        console.log(`user with id ${bakery.id} updated`);
        this.store.dispatch(new fromRoot.Go({path:['/admin/bakeries'], extras: {replaceUrl: true}}));
      },
      error => console.log(`error ${error} updating user with id ${bakery.id}`)
    )
  }
  getCounty(city: string): string {
    const counties = this.citiesService.getCounties();
    for (const county of counties) {
      const cities = this.citiesService.getCitiesByCounty(county);
      for (const ci of cities) {
        if (ci === city) {
          return county;
        }
      }
    }
    return '';
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

