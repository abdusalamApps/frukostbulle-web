import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  title = 'Hantera adminprofil';
  hide = true;

  hide1 = true;

  currentPassword = '';

  enteredPassword = '';
  enteredPassword2 = '';

  constructor(private location: Location,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  changePassword(): void {

  }

  public navigateBack(): void {
    this.location.back();
  }

  signOut(): void {
    this.router.navigate(['/login']);
  }

  updatePassword(): void {
    if (this.enteredPassword === this.enteredPassword2) {
    } else {
      this.snackbar.open('Lösenorden matchar inte', 'Ok', {
        duration: 3000
      });
    }
  }
}
