import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
