import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { TranslocoLocalizeRouterModule } from '@app/core/transloco-localize-router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
];

const EXPORTED_DECLARATIONS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, FormsModule, RouterModule, TranslocoLocalizeRouterModule, ...MATERIAL_MODULES],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {
  constructor() {}
}
