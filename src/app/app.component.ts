import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = environment.supportedLanguages;
  language: string;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this._setLang();
  }

  onChangeLanguage(lang: string): void {
    this._setLang(lang);
  }

  private _setLang(lang?: string): void {
    this.language = lang;
    console.log(this.language ?? environment.defaultLanguage);
    this.translate.use(this.language ?? environment.defaultLanguage);
  }
}
