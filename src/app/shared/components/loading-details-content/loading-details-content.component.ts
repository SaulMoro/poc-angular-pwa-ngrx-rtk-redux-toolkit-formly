import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-details-content',
  templateUrl: './loading-details-content.component.html',
  styleUrls: ['./loading-details-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDetailsContentComponent {}
