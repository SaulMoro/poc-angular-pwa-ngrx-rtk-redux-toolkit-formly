import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LazyModalService } from './lazy-modal.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lazy-modal',
  template: `
    <section
      class="fixed z-50 inset-0 overflow-y-auto transition-opacity duration-300"
      [ngClass]="{
        'visible opacity-100 ease-out': display,
        'invisible opacity-0 ease-in': !display
      }"
      (click)="close()"
    >
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0 bg-gray-900 bg-opacity-40"
      >
        <div
          (click)="$event.stopPropagation()"
          class="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-lg xl:max-w-4xl"
          [ngClass]="{
            'visible opacity-100 translate-y-0 sm:scale-100': display,
            'invisible opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95': !display
          }"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyModalComponent<T> {
  display = true;

  constructor(private modalService: LazyModalService<T>) {}

  async close(): Promise<void> {
    this.display = false;

    setTimeout(async () => {
      await this.modalService.close();
    }, 310);
  }
}
