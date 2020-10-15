import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { PrefetchDirective } from './utils/prefetch.directive';

// Shared Components

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

const EXPORTED_DECLARATIONS = [PrefetchDirective];

const IMPORTED_EXPORTS = [
  CommonModule,
  FormsModule,
  DynamicFormsModule,
  TranslateModule,
  FlexLayoutModule,
  ...MATERIAL_MODULES,
];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [...IMPORTED_EXPORTS, DataAccessCharactersModule, DataAccessLocationsModule, DataAccessEpisodesModule],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {
  constructor() {}
}
