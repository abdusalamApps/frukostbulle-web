import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generate-sellercode',
  templateUrl: './generate-sellercode.component.html',
  styleUrls: ['./generate-sellercode.component.scss']
})
export class GenerateSellercodeComponent implements OnInit {
  title = 'Generera kod till säljarprofil';
  router: Router;
  location: Location;

  code: string;

  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;
    this.code = '0';
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }

  getCode(): void {
    this.code = this.generateCode();
  }

  generateCode(): string {
    const temp: number = + this.code + 1;
    return '' + temp;
  }
}
