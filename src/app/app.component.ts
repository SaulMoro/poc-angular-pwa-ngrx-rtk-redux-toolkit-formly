import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = environment.supportedLanguages;
  language;

  constructor(private translate: TranslocoService) {}

  ngOnInit(): void {
    this._setLang(getBrowserLang() ?? this.translate.getActiveLang());
  }

  onChangeLanguage(lang: string): void {
    this._setLang(lang);
  }

  private _setLang(lang: string): void {
    this.language = lang ?? environment.defaultLanguage;
    this.translate.setActiveLang(this.language);
  }
}
