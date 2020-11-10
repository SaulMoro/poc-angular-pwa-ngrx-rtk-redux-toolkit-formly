import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
];

const EXPORTED_DECLARATIONS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveComponentModule,
    LocalizeRouterModule,
    ...MATERIAL_MODULES,
  ],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {
  constructor() {}
}
