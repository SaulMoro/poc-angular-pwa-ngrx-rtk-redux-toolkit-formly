import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-character',
  templateUrl: './loading-character.component.html',
  styleUrls: ['./loading-character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCharacterComponent {}
