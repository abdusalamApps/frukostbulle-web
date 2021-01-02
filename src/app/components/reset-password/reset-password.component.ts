import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],

})
export class ResetPasswordComponent implements OnInit {

  title = 'Lösenord återställning';
  email = '';

  constructor(private snackBar: MatSnackBar,
              // private passwordService: PasswordService
              ){}

  ngOnInit(): void {
  }

  sendResetRequest(): void {
    this.snackBar.open('Tack för din begäran', 'Stäng', {
      duration: 3000
    });
  //  this.passwordService.requestNewPassword();
  //  this.location.back();
  }

  navigateBack(){

  }
}
