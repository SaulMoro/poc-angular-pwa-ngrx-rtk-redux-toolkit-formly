import { Routes } from '@angular/router';
import { TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';
import { TranslocoLocalizeRouterGuard } from './transloco-localize-router.guard';
import { TranslocoLocalizeRouterResolver } from './transloco-localize-router.resolver';

export const localizeRoutes = (routes: Routes, { alwaysPrefix, langPath }: TranslocoLocalizeRouterConfig): Routes => {
  const hasWildCard = routes[routes.length - 1]?.path === '**';
  return alwaysPrefix
    ? [
        {
          path: langPath,
          canActivate: [TranslocoLocalizeRouterGuard],
          resolve: [TranslocoLocalizeRouterResolver],
          children: [...routes],
        },
      ]
    : [
        ...(hasWildCard ? routes.slice(0, -1) : routes)?.map((route) => ({
          ...route,
          resolve: [TranslocoLocalizeRouterResolver],
        })),
        {
          path: langPath,
          canActivate: [TranslocoLocalizeRouterGuard],
          resolve: [TranslocoLocalizeRouterResolver],
          children: [...routes],
        },
        ...(hasWildCard ? [routes[routes.length - 1]] : []),
      ];
};
