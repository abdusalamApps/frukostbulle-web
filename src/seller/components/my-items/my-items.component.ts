import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item.model';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss'],
})
export class MyItemsComponent implements OnInit {
  title = 'Mina frallor';

  items$: Observable<Item[]> = new Observable<[]>();

  constructor() {}

  ngOnInit(): void {}
}
