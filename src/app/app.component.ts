import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { translateRoute, TranslocoLocalizeRouterService } from '@saulmoro/transloco-localize-router/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = this.translate.getAvailableLangs();
  language$ = this.translate.langChanges$;

  constructor(private translate: TranslocoService, private router: Router) {
    console.log(translateRoute(null));
    console.log(translateRoute(''));
    console.log(translateRoute('', 'es'));
    console.log(translateRoute('/'));
    console.log(translateRoute('/', 'es'));
    console.log(translateRoute('/characters'));
    console.log(translateRoute('/characters', 'es'));
    console.log(translateRoute('/characters/asas/1'));
    console.log(translateRoute('/characters/asas/1', 'es'));

    console.log(translateRoute(['']));
    console.log(translateRoute([''], 'es'));
    console.log(translateRoute(['/']));
    console.log(translateRoute(['/'], 'es'));
    console.log(translateRoute(['/characters']));
    console.log(translateRoute(['/characters'], 'es'));
    console.log(translateRoute(['/characters/asas/1']));
    console.log(translateRoute(['/characters/asas/1'], 'es'));
  }

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
