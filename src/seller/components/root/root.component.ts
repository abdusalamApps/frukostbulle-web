import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, query, style, transition, trigger} from '@angular/animations';

// experimental animation that is not used currently
export const fader =
  trigger('routerAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
        })
      ]),
      // Animate the new page
      query(':enter', [
        animate('400ms ease', style({opacity: 1}))
      ])
    ])
  ]);

// This component has the bottom navigation bar and is shown
// in all seller's component when the user is logged in
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}

