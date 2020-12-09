import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoLocalizeRouterModule } from 'transloco-localize-router';

import { HeaderComponent } from './header/header.component';
import { LanguageDropdownComponent } from './header/language-dropdown/language-dropdown.component';
import { FooterComponent } from './footer/footer.component';

const EXPORTED_DECLARATIONS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS, LanguageDropdownComponent],
  imports: [CommonModule, FormsModule, RouterModule, TranslocoLocalizeRouterModule],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {
  constructor() {}
}
