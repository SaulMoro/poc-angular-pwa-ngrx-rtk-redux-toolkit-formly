import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = this.translate.getAvailableLangs();
  language$ = this.translate.langChanges$;

  constructor(private translate: TranslocoService, private router: Router) {}

  ngOnInit(): void {}

  onChangeLanguage(lang: string): void {
    if (lang !== this.translate.getActiveLang()) {
      const route = this.router.url;
      const isPrevDefaultLang = this.translate.getActiveLang() === this.translate.getDefaultLang();
      const isDefaultLang = lang === this.translate.getDefaultLang();
      const startPath = isDefaultLang ? '' : `/${lang}`;

      if (isDefaultLang) {
        this.translate.setActiveLang(lang);
      }

      this.router.navigateByUrl(isPrevDefaultLang ? startPath + route : startPath + route.slice(3));
    }
  }
}
