import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly body: HTMLElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.body = this.document.body;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.body.classList.remove('light', 'dark');
    this.body.classList.add(theme);
  }
}
