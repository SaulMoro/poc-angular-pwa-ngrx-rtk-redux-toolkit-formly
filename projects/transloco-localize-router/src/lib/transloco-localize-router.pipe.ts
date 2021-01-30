import { Pipe, PipeTransform } from '@angular/core';
import { translateRoute } from './transloco-localize-router.service';

@Pipe({
  name: 'localize',
})
export class TranslocoLocalizeRouterPipe implements PipeTransform {
  /**
   * Requires currentLang to translate paths in non-lazy modules.
   * Can be used to force route lang.
   *
   * (Ex: LayoutModule)
   */
  transform(route: string | any[], currentLang?: string): string | any[] {
    return translateRoute(route, currentLang);
  }
}
