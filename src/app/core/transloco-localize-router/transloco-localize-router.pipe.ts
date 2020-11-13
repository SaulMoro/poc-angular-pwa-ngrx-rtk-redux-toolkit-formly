import { Pipe, PipeTransform } from '@angular/core';
import { translateRoute } from './transloco-localize-router.service';

@Pipe({
  name: 'localize',
})
export class TranslocoLocalizeRouterPipe implements PipeTransform {
  constructor() {}

  /**
   * Receive the transloco directive to hack the pipe
   * (recalculate the route when changing the language).
   *
   * Requires reRenderOnLangChange=true for the hack to work.
   */
  transform(route: string | any[], tDirective?: any): string | any[] {
    return translateRoute(route);
  }
}
