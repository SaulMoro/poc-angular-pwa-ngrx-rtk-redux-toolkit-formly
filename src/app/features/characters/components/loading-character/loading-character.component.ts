import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-character',
  templateUrl: './loading-character.component.html',
  styleUrls: ['./loading-character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCharacterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
