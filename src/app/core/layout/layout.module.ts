import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { TranslocoLocalizeRouterModule } from 'transloco-localize-router';

import { HeaderComponent } from './header/header.component';
import { LanguageDropdownComponent } from './header/language-dropdown/language-dropdown.component';
import { FooterComponent } from './footer/footer.component';
import { icons } from './layout.icons';

const EXPORTED_DECLARATIONS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS, LanguageDropdownComponent],
  imports: [CommonModule, FormsModule, RouterModule, TranslocoLocalizeRouterModule, SvgIconsModule.forChild(icons)],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {}
