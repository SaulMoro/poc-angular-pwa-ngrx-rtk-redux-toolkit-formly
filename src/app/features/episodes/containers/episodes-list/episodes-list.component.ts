import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
