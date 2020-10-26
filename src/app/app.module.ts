import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from '@app/core/core.module';
import { environment } from '@environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    // core
    CoreModule,

    // app
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
