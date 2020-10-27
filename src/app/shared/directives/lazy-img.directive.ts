import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'img',
})
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
