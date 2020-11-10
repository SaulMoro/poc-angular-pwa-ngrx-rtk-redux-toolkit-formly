import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './containers/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    data: {
      title: 'NOT_FOUND.TITLE',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
