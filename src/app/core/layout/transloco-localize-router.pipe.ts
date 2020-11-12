import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'localize',
})
export class TranslocoLocalizeRouterPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(query: string | any[], transloco?): string | any[] {
    return !query || this.translocoService.getActiveLang() === this.translocoService.getDefaultLang()
      ? query
      : Array.isArray(query)
      ? [
          `/${this.translocoService.getActiveLang()}`,
          ...query.map((routes: string) => routes.replace('/', '')).filter(Boolean),
        ]
      : `/${this.translocoService.getActiveLang()}/${query}`;
  }
}
