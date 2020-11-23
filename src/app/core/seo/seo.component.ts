import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from './seo.service';
import { SeoConfig } from './types';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'seo',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeoComponent implements OnInit, OnChanges {
  @Input() config: Partial<SeoConfig>;

  constructor(private seoService: SeoService, private router: Router) {}

  ngOnInit(): void {
    // this.updateMetaTags();
  }

  ngOnChanges(): void {
    this.updateMetaTags();
  }

  private updateMetaTags(): void {
    this.seoService.generateMetaTags({ ...this.config, route: this.router.url });
  }
}
