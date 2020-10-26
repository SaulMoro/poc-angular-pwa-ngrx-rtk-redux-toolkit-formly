import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormsModule } from '@app/core/dynamic-forms';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Shared Data Access
import { DataAccessCharactersModule } from './data-access-characters';
import { DataAccessLocationsModule } from './data-access-locations';
import { DataAccessEpisodesModule } from './data-access-episodes';

import { CharacterMiniCardComponent } from './components/character-mini-card/character-mini-card.component';
import { CharactersDialogComponent } from './components/characters-dialog/characters-dialog.component';
import { PrefetchDirective } from './directives/prefetch.directive';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatBadgeModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
];

const EXPORTED_DECLARATIONS = [CharacterMiniCardComponent, PrefetchDirective];

const IMPORTED_EXPORTS = [CommonModule, DynamicFormsModule, TranslateModule, FlexLayoutModule, ...MATERIAL_MODULES];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS, CharactersDialogComponent],
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
