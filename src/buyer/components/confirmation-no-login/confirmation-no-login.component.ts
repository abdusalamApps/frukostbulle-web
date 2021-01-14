import { Component, OnInit } from '@angular/core';
// Not used anywhere yet.
@Component({
  selector: 'app-confirmation-no-login',
  templateUrl: './confirmation-no-login.component.html',
  styleUrls: ['./confirmation-no-login.component.scss']
})
export class ConfirmationNoLoginComponent implements OnInit {

  title = 'Bekräftelse';

  constructor() {}

  ngOnInit(): void {}

}
