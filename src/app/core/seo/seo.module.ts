import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo.component';

const EXPORTED_DECLARATIONS = [SeoComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SeoModule {}
