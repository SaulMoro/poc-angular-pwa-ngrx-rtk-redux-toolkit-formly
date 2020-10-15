import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadChildren: () => import('./features/characters/characters.module').then((m) => m.CharactersModule),
    data: {
      title: 'CHARACTERS.TITLE',
    },
  },
  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations.module').then((m) => m.LocationsModule),
    data: {
      title: 'LOCATIONS.TITLE',
    },
  },
  {
    path: 'episodes',
    loadChildren: () => import('./features/episodes/episodes.module').then((m) => m.EpisodesModule),
    data: {
      title: 'EPISODES.TITLE',
    },
  },
  {
    path: 'not-found',
    loadChildren: () => import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
    data: {
      title: 'NOT_FOUND.TITLE',
    },
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
