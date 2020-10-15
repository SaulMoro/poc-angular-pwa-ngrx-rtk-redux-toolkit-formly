import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreenComponent implements OnInit {
  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}
}
