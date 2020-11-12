import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadChildren: () => import('./features/characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations.module').then((m) => m.LocationsModule),
  },
  {
    path: 'episodes',
    loadChildren: () => import('./features/episodes/episodes.module').then((m) => m.EpisodesModule),
  },
  {
    path: '404',
    loadChildren: () => import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(localizeRoutes(routes), {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
