import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[prefetch]',
})
export class PrefetchDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  prefetchMode: ('load' | 'hover' | 'visible')[] = ['hover'];
  @Input()
  prefetchHovered = false;
  @Output()
  prefetch = new EventEmitter<void>();

  observer!: IntersectionObserver;
  loaded = false;

  constructor(private elemRef: ElementRef) {}

  ngOnInit(): void {
    if (this.prefetchMode.includes('load')) {
      this.prefetchData();
    }
  }

  ngAfterViewInit(): void {
    if (this.prefetchMode.includes('visible')) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.prefetchData();
            this.observer.disconnect();
          }
        });
      });

      this.observer.observe(this.elemRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.loaded && this.prefetchMode.includes('hover')) {
      this.loaded = !this.prefetchHovered;
      this.prefetchData();
    }
  }

  prefetchData(): void {
    this.prefetch.next();
  }
}
