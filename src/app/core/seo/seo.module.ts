import { NgModule } from '@angular/core';
import { SeoComponent } from './seo.component';

const EXPORTED_DECLARATIONS = [SeoComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SeoModule {}
