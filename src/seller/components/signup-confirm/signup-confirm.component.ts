import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.scss']
})
export class SignupConfirmComponent implements OnInit {

  code = '';

  constructor() { }

  ngOnInit(): void {
  }

}
