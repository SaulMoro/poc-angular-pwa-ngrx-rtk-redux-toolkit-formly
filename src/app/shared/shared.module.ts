import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveComponentModule } from '@ngrx/component';
import { TranslocoLocalizeRouterModule } from 'transloco-localize-router';

// Shared Data Access
import { DataAccessCharactersModule } from './data-access-characters';
import { DataAccessLocationsModule } from './data-access-locations';
import { DataAccessEpisodesModule } from './data-access-episodes';

import { DynamicFormsModule } from '@app/core/dynamic-forms';
import { SeoModule } from '@app/core/seo';
import { PrefetchDirective } from './directives/prefetch.directive';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CharacterMiniCardComponent } from './components/character-mini-card/character-mini-card.component';
import { LoadingCharacterMiniCardComponent } from './components/loading-character-mini-card/loading-character-mini-card.component';
import { LoadingDetailsContentComponent } from './components/loading-details-content/loading-details-content.component';

const EXPORTED_DECLARATIONS = [
  PrefetchDirective,
  LazyImgDirective,
  AutofocusDirective,
  TableComponent,
  PaginatorComponent,
  ProgressBarComponent,
  CharacterMiniCardComponent,
  LoadingCharacterMiniCardComponent,
  LoadingDetailsContentComponent,
];

const IMPORTED_EXPORTS = [
  CommonModule,
  DynamicFormsModule,
  SeoModule,
  TranslocoModule,
  TranslocoLocalizeRouterModule,
  ReactiveComponentModule,
  ContentLoaderModule,
];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    ...IMPORTED_EXPORTS,
    RouterModule,

    // Shared data access
    DataAccessCharactersModule,
    DataAccessLocationsModule,
    DataAccessEpisodesModule,
  ],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {
  constructor() {}
}
