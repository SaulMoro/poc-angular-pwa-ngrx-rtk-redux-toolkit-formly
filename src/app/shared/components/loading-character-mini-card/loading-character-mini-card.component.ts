import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-character-mini-card',
  templateUrl: './loading-character-mini-card.component.html',
  styleUrls: ['./loading-character-mini-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCharacterMiniCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
