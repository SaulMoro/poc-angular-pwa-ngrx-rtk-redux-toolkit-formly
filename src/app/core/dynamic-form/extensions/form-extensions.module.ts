import { NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FORMLY_CONFIG } from '@ngx-formly/core';

import { registerTranslateExtension } from './translate.extension';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslocoService] },
  ],
})
export class FormExtensionsModule {}
