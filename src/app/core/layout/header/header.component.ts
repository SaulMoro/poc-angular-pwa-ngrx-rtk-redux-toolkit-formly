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
  @Output() changeTheme = new EventEmitter<'light' | 'dark'>();

  menuPanelOpened = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenuPanel(): void {
    this.menuPanelOpened = !this.menuPanelOpened;
  }

  selectLanguage(language: string): void {
    this.changeLanguage.emit(language);
  }

  toggleTheme(): void {
    this.changeTheme.emit(this.theme === 'dark' ? 'light' : 'dark');
  }

  trackByFn(index: number): number {
    return index;
  }
}
