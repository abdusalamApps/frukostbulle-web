import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, query, style, transition, trigger} from '@angular/animations';

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

