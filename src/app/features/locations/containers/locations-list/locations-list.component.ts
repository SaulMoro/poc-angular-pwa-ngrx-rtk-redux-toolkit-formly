import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
