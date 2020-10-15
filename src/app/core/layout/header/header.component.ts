import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

export interface MenuItem {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  appMenu$: Observable<MenuItem[]> = this.translate.onLangChange.pipe(
    startWith(1),
    map(() => this._fillMenu())
  );

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: MenuItem): number {
    return index;
  }

  private _fillMenu(): MenuItem[] {
    return [
      {
        name: this.translate.instant('CHARACTERS.TITLE'),
        path: '/characters',
      },
      {
        name: this.translate.instant('LOCATIONS.TITLE'),
        path: '/locations',
      },
      {
        name: this.translate.instant('EPISODES.TITLE'),
        path: '/episodes',
      },
    ];
  }
}
