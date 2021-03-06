import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-dropdown',
  template: `
    <div class="relative">
      <button
        type="button"
        class="inline-flex justify-center w-16 px-3 py-2 text-sm font-medium text-white rounded-md hover:text-yellow-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
        aria-haspopup="true"
        [attr.aria-expanded]="langPanelOpened"
        (click)="toggleLanguagePanel()"
      >
        {{ language | uppercase }}
        <span class="sr-only">Open language menu</span>
        <svg
          class="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Language dropdown panel, show/hide based on dropdown state.-->
      <div
        *ngIf="langPanelOpened"
        class="absolute right-0 w-24 mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a
            *ngFor="let l of languages; trackBy: trackByFn"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
            [ngClass]="{ 'text-gray-900 bg-gray-100 cursor-not-allowed dark:bg-gray-600': l === language }"
            role="menuitem"
            [routerLink]="['./'] | localize: l"
            queryParamsHandling="merge"
            (click)="onLanguageSelect(l)"
          >
            {{ l | uppercase }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageDropdownComponent {
  @Input() language?: string;
  @Input() languages?: string[];
  @Output() languageSelected = new EventEmitter<string>();

  langPanelOpened = false;

  toggleLanguagePanel(): void {
    this.langPanelOpened = !this.langPanelOpened;
  }

  onLanguageSelect(lang: string): void {
    this.langPanelOpened = false;
    this.languageSelected.emit(lang);
  }

  trackByFn(index: number): number {
    return index;
  }
}
