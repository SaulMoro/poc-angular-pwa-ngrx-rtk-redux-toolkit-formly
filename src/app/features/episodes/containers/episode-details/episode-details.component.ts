import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
