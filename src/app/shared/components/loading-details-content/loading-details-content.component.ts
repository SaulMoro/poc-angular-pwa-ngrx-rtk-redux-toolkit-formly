import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-details-content',
  templateUrl: './loading-details-content.component.html',
  styleUrls: ['./loading-details-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDetailsContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
