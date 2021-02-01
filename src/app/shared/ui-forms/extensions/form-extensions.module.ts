import { NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';

import { registerTranslateExtension } from './translate.extension';
import { debounceExtension } from './debounce.extension';

@NgModule({
  declarations: [],
  imports: [
    FormlyModule.forChild({
      extensions: [{ name: 'debounce', extension: { prePopulate: debounceExtension } }],
    }),
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslocoService] },
  ],
})
export class FormExtensionsModule {}
