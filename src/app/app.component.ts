import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TranslocoLocalizeRouterService } from '@saulmoro/transloco-localize-router/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  supportedLanguages = this.translate.getAvailableLangs();
  language$ = this.translate.langChanges$;

  constructor(private translate: TranslocoService, private translatoLozalizeRouter: TranslocoLocalizeRouterService) {}

  ngOnInit(): void {}

  onChangeLanguage(lang: string): void {
    this.translatoLozalizeRouter.changeLanguage(lang);
  }
}
