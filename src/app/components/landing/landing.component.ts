import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  title = 'Välkommen till Frukostbulle';

  signup = false;
  constructor() {}

  ngOnInit(): void {}
}
