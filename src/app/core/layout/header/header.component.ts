import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() language: string;
  @Input() languages: string[];
  @Input() theme: 'light' | 'dark';
  @Output() changeLanguage = new EventEmitter<string>();
  @Output() toggleTheme = new EventEmitter();

  menuPanelOpened = false;

  constructor() {}

  ngOnInit(): void {}

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
