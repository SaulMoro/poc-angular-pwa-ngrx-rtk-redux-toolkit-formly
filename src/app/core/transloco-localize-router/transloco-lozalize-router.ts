import { Routes } from '@angular/router';
import { TranslocoLocalizeRouterGuard } from './transloco-localize-router.guard';

export const localizeRoutes = (routeRoot: Routes, langPath = ':lang'): Routes => {
  const hasWildCard = routeRoot[routeRoot.length - 1]?.path === '**';
  return [
    ...(hasWildCard ? routeRoot.slice(0, -1) : routeRoot),
    {
      path: langPath,
      canActivate: [TranslocoLocalizeRouterGuard],
      children: [...routeRoot],
    },
    ...(hasWildCard ? [routeRoot[routeRoot.length - 1]] : []),
  ];
};
