import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from '@environments/environment';

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
export class HeaderComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() languages: string[];
  @Output() languageChange = new EventEmitter<string>();

  appMenu: MenuItem[];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.appMenu = this._fillMenu();
  }

  ngOnChanges(): void {
    this.appMenu = this._fillMenu();
  }

  trackByFn(index: number): number {
    return index;
  }

  onLanguageSelect({ value: language }): void {
    this.languageChange.emit(language);
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
