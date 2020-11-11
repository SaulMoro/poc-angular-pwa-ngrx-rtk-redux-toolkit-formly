import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = environment.supportedLanguages;
  language: string;

  constructor(private translate: TranslocoService) {}

  ngOnInit(): void {}

  onChangeLanguage(lang: string): void {
    this._setLang(lang);
  }

  private _setLang(lang?: string): void {
    this.language = lang;
    this.translate.setActiveLang(this.language ?? environment.defaultLanguage);
  }
}
