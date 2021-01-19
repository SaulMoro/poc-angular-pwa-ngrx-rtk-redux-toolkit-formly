import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { environment } from '@environments/environment';
import { MenuItem } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() menu: MenuItem[] = [];
  @Input() language: string = environment.defaultLanguage;
  @Input() languages: string[] = environment.supportedLanguages;
  @Input() theme!: 'light' | 'dark';
  @Output() changeLanguage = new EventEmitter<string>();
  @Output() toggleTheme = new EventEmitter();

  menuPanelOpened = false;

  toggleMenuPanel(): void {
    this.menuPanelOpened = !this.menuPanelOpened;
  }

  selectLanguage(language: string): void {
    this.changeLanguage.emit(language);
  }

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  trackByFn(index: number): number {
    return index;
  }
}
