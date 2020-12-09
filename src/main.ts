import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // Zone less (with ngrx-component)
    // https://christiankohler.net/reactive-angular-with-ngrx-component
    // ngZone: 'noop',

    // https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
