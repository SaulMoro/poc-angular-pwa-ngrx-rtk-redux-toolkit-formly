import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader,
} from '@gilsdav/ngx-translate-router';
import { environment } from '@environments/environment';

export function createTranslateLoader(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings
): ManualParserLoader {
  return new ManualParserLoader(translate, location, settings, environment.supportedLanguages, 'ROUTES.');
}

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
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      useHash: true, // Supports github.io demo page
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: createTranslateLoader,
        deps: [TranslateService, Location, LocalizeRouterSettings],
      },
      // alwaysSetPrefix: false,
      // defaultLangFunction: (langs, cachedLang) => environment.defaultLanguage,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
