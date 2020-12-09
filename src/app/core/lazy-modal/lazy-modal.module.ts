import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyModalComponent } from './lazy-modal.component';

@NgModule({
  declarations: [LazyModalComponent],
  imports: [CommonModule],
  exports: [LazyModalComponent],
})
export class LazyModalModule {}
