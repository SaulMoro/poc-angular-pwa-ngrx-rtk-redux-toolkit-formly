import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {
  TranslocoLocalizeRouterModule,
  initTranslocoLocalizeRouter,
  TranslocoLocalizeRouter,
} from '@saulmoro/transloco-localize-router/index';

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
    redirectTo: '404',
  },
];

const TRANSLOCO_LOCALIZE_ROUTER: TranslocoLocalizeRouter = initTranslocoLocalizeRouter(routes);

@NgModule({
  imports: [
    TranslocoLocalizeRouterModule.forRoot(TRANSLOCO_LOCALIZE_ROUTER.config),
    RouterModule.forRoot(TRANSLOCO_LOCALIZE_ROUTER.routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      useHash: true, // Supports github.io demo page
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
