import { Routes } from '@angular/router';
import { TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';
import { TranslocoLocalizeRouterGuard } from './transloco-localize-router.guard';

export const localizeRoutes = (
  routes: Routes,
  { alwaysPrefix, noPrefixLang, langPath }: TranslocoLocalizeRouterConfig
): Routes => {
  const hasWildCard = routes[routes.length - 1]?.path === '**';
  return alwaysPrefix
    ? [
        { path: '', redirectTo: noPrefixLang, pathMatch: 'full' },
        {
          path: langPath,
          canActivate: [TranslocoLocalizeRouterGuard],
          children: [...routes],
        },
      ]
    : [
        ...(hasWildCard ? routes.slice(0, -1) : routes),
        {
          path: langPath,
          canActivate: [TranslocoLocalizeRouterGuard],
          canDeactivate: [TranslocoLocalizeRouterGuard],
          children: [...routes],
        },
        ...(hasWildCard ? [routes[routes.length - 1]] : []),
      ];
};
