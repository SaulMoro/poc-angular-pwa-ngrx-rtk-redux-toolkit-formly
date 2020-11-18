import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-episode',
  templateUrl: './loading-episode.component.html',
  styleUrls: ['./loading-episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingEpisodeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
